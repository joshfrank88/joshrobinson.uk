const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: ['https://joshrobinson.uk', 'http://localhost:8000', 'http://localhost:3000'],
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple rate limiting
const requestCounts = new Map();
const RATE_LIMIT = 5; // 5 requests
const RATE_LIMIT_WINDOW = 60000; // 1 minute

const rateLimiterMiddleware = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else {
        const userData = requestCounts.get(ip);
        if (now > userData.resetTime) {
            userData.count = 1;
            userData.resetTime = now + RATE_LIMIT_WINDOW;
        } else {
            userData.count++;
        }
        
        if (userData.count > RATE_LIMIT) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests. Please try again later.'
            });
        }
    }
    
    next();
};

// Email transporter setup
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'outlook',
        auth: {
            user: process.env.EMAIL_USER || 'josh@joshrobinson.uk',
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
};

// Contact form endpoint
app.post('/api/contact', rateLimiterMiddleware, async (req, res) => {
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

        // Send email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to user
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER || 'josh@joshrobinson.uk',
            to: email,
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

        await transporter.sendMail(confirmationMailOptions);

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
