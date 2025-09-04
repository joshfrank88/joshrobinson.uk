const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const sgMail = require('@sendgrid/mail');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Advanced Security Headers & CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://joshrobinson-uk-backend-emailing.onrender.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
            workerSrc: ["'self'", "blob:"],
            manifestSrc: ["'self'"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    frameguard: { action: 'deny' },
    noSniff: true,
    ieNoOpen: true,
    xssFilter: true
}));

// CORS configuration with enhanced security
app.use(cors({
    origin: ['https://joshrobinson.uk', 'https://www.joshrobinson.uk', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 hours
}));

// Additional security middleware
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Advanced Rate Limiting & DDoS Protection
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 contact form submissions per 15 minutes
    message: {
        success: false,
        message: 'Too many contact form submissions. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Rate limit exceeded. Please try again in 15 minutes.'
        });
    }
});

const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per minute
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Apply rate limiting to all routes
app.use(generalLimiter);

// Performance monitoring middleware
app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`📊 ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
        
        // Log slow requests
        if (duration > 1000) {
            console.warn(`🐌 Slow request detected: ${req.method} ${req.path} took ${duration}ms`);
        }
    });
    
    next();
});

// Advanced caching headers
app.use((req, res, next) => {
    // Cache static assets for 1 year
    if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|webp|ico|svg)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Cache HTML for 1 hour
    else if (req.path.match(/\.html$/)) {
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
    // Cache API responses for 5 minutes
    else if (req.path.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'private, max-age=300, must-revalidate');
    }
    // Default cache control
    else {
        res.setHeader('Cache-Control', 'public, max-age=600, must-revalidate');
    }
    
    next();
});

// Email transporter setup
const createTransporter = () => {
    const emailService = process.env.EMAIL_SERVICE || 'gmail';
    
    if (emailService === 'godaddy') {
        // GoDaddy 365 Essentials uses Microsoft 365 SMTP
        return nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // Start with TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            },
            requireTLS: true,
            ignoreTLS: false
        });
    } else if (emailService === 'outlook') {
        return nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
    } else {
        // Gmail configuration
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }
};

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, service, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required.'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        // Create transporter
        const transporter = createTransporter();

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'josh@joshrobinson.uk',
            to: 'josh@joshrobinson.uk',
            replyTo: email,
            subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: #0A1D3F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #0A1D3F; margin-bottom: 10px;">Contact Details</h3>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                            ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #0A1D3F; margin-bottom: 10px;">Message</h3>
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #F5B700;">
                                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #666; font-size: 14px; margin: 0;">
                                This message was sent from your website contact form at joshrobinson.uk
                            </p>
                        </div>
                    </div>
                </div>
            `,
            text: `
New Contact Form Submission

Contact Details:
- Name: ${name}
- Email: ${email}
${service ? `- Service Interest: ${service}` : ''}

Message:
${message}

---
Sent from joshrobinson.uk contact form
            `
        };

        // Configure SendGrid
        sgMail.setApiKey(process.env.
        SENDGRID_API_KEY);

        // Send main email to you
        const mainEmail = {
            to: 'josh@joshrobinson.uk',
            from: 'noreply@joshrobinson.uk', // This will be your verified sender
            replyTo: email,
            subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
            html: mailOptions.html,
            text: mailOptions.text
        };

        await sgMail.send(mainEmail);

        // Send confirmation email to user
        const confirmationEmail = {
            to: email,
            from: 'noreply@joshrobinson.uk',
            subject: 'Thanks for reaching out! - Josh Robinson',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: #0A1D3F; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            Hi ${name},
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            Thanks for getting in touch! I've received your message and will get back to you within 24 hours.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            In the meantime, feel free to check out my latest insights on student empowerment and academic success.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://joshrobinson.uk" style="background-color: #F5B700; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                Visit My Website
                            </a>
                        </div>
                        
                        <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            Best regards,<br>
                            Josh Robinson<br>
                            <a href="mailto:josh@joshrobinson.uk">josh@joshrobinson.uk</a>
                        </p>
                    </div>
                </div>
            `
        };

        await sgMail.send(confirmationEmail);

        res.json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Server Error:', err);
    
    // Security logging
    if (err.status === 429) {
        console.warn(`🚫 Rate limit exceeded for IP: ${req.ip}`);
    }
    
    // Don't expose internal errors to client
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = isDevelopment ? err.message : 'Internal server error';
    
    res.status(err.status || 500).json({
        success: false,
        message: errorMessage,
        ...(isDevelopment && { stack: err.stack })
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Contact form backend is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Contact form backend running on port ${PORT}`);
    console.log(`📧 Email will be sent from: ${process.env.EMAIL_USER || 'josh@joshrobinson.uk'}`);
});

module.exports = app;
