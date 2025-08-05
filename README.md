# Josh Robinson - Personal Website

A modern, responsive personal website for Josh Robinson - Speaker, Educator, and Founder of London Student Network.

## 🌟 Features

- **Modern Design**: Clean, professional UI with warm and trustworthy aesthetics
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Interactive Elements**: Smooth animations, hover effects, and scroll animations
- **Fast Loading**: Optimized performance with lazy loading and efficient code
- **Accessibility**: Built with accessibility best practices and ARIA labels
- **Contact Form**: Functional contact form with validation (ready for backend integration)

## 🎨 Design Highlights

- **Color Palette**: Deep navy (#0b1d3a), off-white (#f9f9f9), and soft gold accent (#d69e2e)
- **Typography**: Inter font family for clean, modern readability
- **Animations**: Smooth fade-ins, hover effects, and scroll-triggered animations
- **Layout**: Grid-based responsive layout with mobile hamburger navigation

## 📁 File Structure

```
public/
├── index.html          # Main HTML file
├── style.css           # Comprehensive CSS styling
├── scripts.js          # Interactive JavaScript functionality
├── README.md           # This file
└── assets/             # Images and media files
    ├── josh-bridge.jpg # Hero background image
    ├── lsn-logo.jpg    # London Student Network logo
    └── kings-politics-logo.jpg # King's Politics Society logo
```

## 🚀 Deployment on GitHub Pages

### Option 1: Using GitHub Web Interface

1. **Create a new repository** on GitHub
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it `joshrobinson-website` (or your preferred name)
   - Make it public
   - Don't initialize with README (we already have one)

2. **Upload files**
   - Click "uploading an existing file"
   - Drag and drop all files from the `public/` folder
   - Commit the files

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your site will be available at:**
   ```
   https://[your-username].github.io/[repository-name]
   ```

### Option 2: Using Git Commands

1. **Initialize and push to GitHub:**
   ```bash
   cd public
   git init
   git add .
   git commit -m "Initial commit: Josh Robinson personal website"
   git branch -M main
   git remote add origin https://github.com/[your-username]/[repository-name].git
   git push -u origin main
   ```

2. **Enable GitHub Pages** (follow step 3 from Option 1)

### Option 3: Custom Domain (Optional)

1. **Add a CNAME file** in your repository root:
   ```
   your-domain.com
   ```

2. **Configure DNS** with your domain provider:
   - Add a CNAME record pointing to `[your-username].github.io`

3. **Update GitHub Pages settings** to use your custom domain

## 🖼️ Adding Images

To complete the website, add these images to the `assets/` folder:

1. **josh-bridge.jpg** - Hero background image of Josh smiling on a bridge
2. **lsn-logo.jpg** - London Student Network logo
3. **kings-politics-logo.jpg** - King's Politics Society logo

### Image Requirements:
- **Hero image**: 1920x1080px or larger, high quality
- **Logos**: PNG or JPG, transparent background preferred for logos
- **File size**: Optimize images to under 500KB each for fast loading

## 🛠️ Customization

### Updating Content

- **Personal info**: Edit the text content in `index.html`
- **Contact email**: Update `hello@joshrobinson.uk` throughout the files
- **Social links**: Update Instagram and LinkedIn URLs in the footer and contact sections
- **Services**: Modify the service cards in the "What I Offer" section
- **Testimonials**: Replace placeholder testimonials with real ones

### Styling Changes

- **Colors**: Update the CSS custom properties in `style.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Modify grid layouts and responsive breakpoints in `style.css`

### Adding Functionality

- **Form backend**: Integrate the contact form with a service like Formspree, Netlify Forms, or your own backend
- **Analytics**: Add Google Analytics or other tracking code
- **CMS**: Consider adding a headless CMS for easier content updates

## 📱 Browser Support

- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+
- **Features**: Uses modern CSS Grid, Flexbox, and ES6+ JavaScript

## ⚡ Performance

- **Optimized images**: Use WebP format when possible
- **Minification**: Consider minifying CSS and JS for production
- **CDN**: Font Awesome and Google Fonts loaded from CDN
- **Lazy loading**: Images load as they come into view

## 🔧 Development

To work on this locally:

1. **Serve files** using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**: Navigate to `http://localhost:8000`

## 📞 Support

For technical support or customization requests, contact:
- **Email**: hello@joshrobinson.uk
- **GitHub Issues**: Create an issue in this repository

## 📄 License

This website template is created specifically for Josh Robinson. Feel free to use it as inspiration for your own projects, but please don't copy the personal content or branding.

---

**Built with ❤️ and caffeine**

*Ready to deploy and make an impact!*