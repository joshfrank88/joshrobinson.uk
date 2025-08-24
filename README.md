# Josh Robinson - Personal Website

A professional website for Josh Robinson, focusing on student empowerment and academic success.

## 🌟 Features

- **Professional Design**: Clean, modern interface with brand-consistent styling
- **Contact System**: Fully functional contact form with email forwarding
- **Responsive Design**: Optimized for all devices and screen sizes
- **Performance Optimized**: Fast loading with optimized images and code
- **SEO Ready**: Comprehensive meta tags and structured data

## 🚀 Quick Start

### Frontend (Static Site)
The website is a static site that can be served from any web server or CDN.

```bash
# Serve locally for development
python3 -m http.server 8000
```

### Backend (Contact Form)

The contact form requires a Node.js backend to handle email forwarding.

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Set Up Environment Variables
Create a `.env` file in the root directory:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` with your Outlook credentials:
```env
EMAIL_USER=josh@joshrobinson.uk
EMAIL_PASSWORD=your_outlook_app_password_here
PORT=3000
NODE_ENV=production
```

#### 3. Get Outlook App Password
To use your Outlook account for sending emails:

1. Go to [Microsoft Account Security](https://account.microsoft.com/security)
2. Enable 2-factor authentication if not already enabled
3. Generate an "App Password" for this application
4. Use this app password in your `.env` file

#### 4. Start the Backend
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:3000` by default.

## 📧 Email Configuration

The contact form sends emails through your Outlook account:

- **To you**: Professional HTML email with contact details
- **To user**: Confirmation email with your branding
- **Rate limiting**: 5 requests per minute per IP
- **Security**: CORS protection and input validation

## 🛠️ Development

### Project Structure
```
joshrobinson.uk/
├── index.html          # Main website
├── tutoring.html       # Tutoring services page
├── workshops.html      # Workshop services page
├── style.css          # Main stylesheet
├── scripts.js         # Frontend JavaScript
├── server.js          # Backend API server
├── package.json       # Node.js dependencies
├── assets/            # Images and media
└── README.md          # This file
```

### Backend API Endpoints

- `POST /api/contact` - Handle contact form submissions
- `GET /api/health` - Health check endpoint

### Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Sanitizes all form inputs
- **CORS Protection**: Restricts access to allowed domains
- **Helmet.js**: Security headers and protection

## 🌐 Deployment

### Frontend
Deploy the static files (`index.html`, `style.css`, `scripts.js`, `assets/`) to your web server or CDN.

### Backend
Deploy the Node.js backend to a hosting service like:
- **Railway** (recommended for simplicity)
- **Heroku**
- **DigitalOcean App Platform**
- **Vercel** (with serverless functions)

### Environment Variables for Production
Set these in your hosting platform:
- `EMAIL_USER`: Your Outlook email
- `EMAIL_PASSWORD`: Your Outlook app password
- `PORT`: Port number (usually auto-set by hosting platform)
- `NODE_ENV`: Set to "production"

## 📱 Contact Form Features

- **Professional Modal**: Clean, branded contact form
- **Service Selection**: Dropdown with all your offerings
- **Auto-confirmation**: Users receive confirmation emails
- **Mobile Optimized**: Perfect on all devices
- **Error Handling**: Graceful error messages and fallbacks

## 🎨 Brand Kit

- **Primary Color**: Dark Navy #0A1D3F
- **Secondary Color**: White #FFFFFF
- **Accent Color**: Gold #F5B700
- **Fonts**: DM Serif Display (headings), Roboto Mono (body)
- **Mood**: Minimalist, raw, clear, modern

## 📞 Support

For technical support or questions about the contact system, email josh@joshrobinson.uk

---

Built with ❤️ for empowering students to thrive on their own terms.