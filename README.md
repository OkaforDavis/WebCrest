# WebCrest - Digital Solutions & Web Development

## Project Overview

WebCrest is a modern, fully responsive website for a digital solutions and web development company. It showcases our services, portfolio, and expertise in creating innovative web experiences. The site features advanced theming capabilities, smooth animations, and a professional design.

## ✨ Key Features

### 🎨 **Dynamic Theme System**
- **Three Theme Modes**: Dark, Light, and Modern
- **Custom Accent Colors**: Choose from 5 pre-defined colors (Sky Blue, Yellow, Red, Green, Purple)
- **Persistent Storage**: Theme preferences are saved in localStorage and persist across all pages
- **Smooth Transitions**: Elegant theme switching without page reload
- **Glassmorphism Effects**: Modern frosted glass effects in the Modern theme
- **Draggable Theme Button**: Move the theme toggle anywhere on screen

### 🎯 **Desktop Experience**
- Enhanced hover effects on all interactive elements
- Smooth navigation with animated underlines
- Logo animations with scale and rotation effects
- Card hover animations with elevation and glow effects
- Button animations with shimmer effects
- Responsive form inputs with focus states
- Icon animations on hover

### 📱 **Mobile Responsive**
- Fully responsive design for all screen sizes
- Mobile hamburger menu with smooth animations
- Touch-friendly theme toggle
- Optimized layout for tablets and phones

### 🎁 **Premium Components**
- **Hero Section**: Eye-catching landing area with call-to-action buttons
- **Service Cards**: Grid layout showcasing core services with icons
- **Project Portfolio**: Featured work with images and links
- **Team Section**: Meet the team with social links
- **Testimonials**: Client reviews carousel
- **Quote Calculator**: Dynamic pricing calculator with payment integration
- **Contact Form**: Easy-to-use contact form with validation
- **Footer**: Comprehensive footer with social links

### 🚀 **Performance & UX**
- Smooth scrolling behavior
- Page preloader animation
- AOS (Animate On Scroll) library for entrance animations
- Optimized images with lazy loading
- CSS transitions and transforms for smooth motion
- Backdrop blur effects for modern aesthetics

### 💳 **Payment Integration**
- Flutterwave payment gateway integration
- Dynamic pricing calculator
- Quote request payment processing
- Secure transaction handling

### 🌐 **Technical Stack**
- **HTML5**: Semantic and accessible markup
- **CSS3**: Modern styling with CSS variables, gradients, and animations
- **JavaScript**: Vanilla JavaScript (no framework dependencies)
- **Libraries**:
  - AOS (Animate On Scroll) for entrance animations
  - Font Awesome for icons
  - SweetAlert2 for notifications
  - Flutterwave for payments

## 📁 Project Structure

```
WebCrest/
├── index.html              # Home page
├── about.html              # About Us page
├── projects.html           # Portfolio/Projects page
├── style.css               # Main stylesheet with all themes
├── script.js               # JavaScript functionality
├── logo.png                # Website logo
├── README.md               # This file
├── .git/                   # Git repository
└── settings.json           # VS Code settings
```

## 🎨 Theme System

### Dark Theme
- Deep blue backgrounds with subtle gradients
- Light text for excellent contrast
- Optimal for low-light environments

### Light Theme
- Clean, bright backgrounds
- Dark text for readability
- Professional appearance for corporate settings

### Modern Theme
- Gradient backgrounds with glassmorphism effects
- Vibrant accent colors
- Contemporary design aesthetic

### Accent Colors
- **Sky Blue**: #38bdf8 (Default)
- **Yellow**: #facc15
- **Red**: #ef4444
- **Green**: #22c55e
- **Purple**: #8b5cf6

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OkaforDavis/WebCrest.git
   cd WebCrest
   ```

2. **Open the project**
   - Open `index.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 🎯 Usage

### Navigating the Website

1. **Home Page** (`index.html`)
   - Hero section with main call-to-action
   - About brief section
   - Services showcase
   - Technology stack display
   - Testimonials
   - Quote calculator
   - Contact form

2. **About Page** (`about.html`)
   - Company story
   - Mission and values
   - Team member profiles

3. **Projects Page** (`projects.html`)
   - Featured project showcase
   - Project descriptions with links

### Customizing the Theme

1. Click the palette icon (🎨) in the bottom-right corner
2. Select your preferred theme style (Dark, Light, or Modern)
3. Choose an accent color
4. Changes persist automatically across all pages
5. Drag the theme button to any position on screen

### Using the Quote Calculator

1. Navigate to the "Get a Custom Quote" section
2. Select a service type
3. Choose a style preference
4. Select additional features
5. Click "Calculate Price"
6. Review the total and make payment

## 💻 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --color-primary-blue: #0066cc;
  --color-light-blue: #0088ff;
  /* ... more variables */
}
```

### Adding New Themes
1. Add new CSS variables in `style.css`
2. Create a new theme class (e.g., `.sunset-theme`)
3. Update `script.js` to include the new theme option

### Modifying Services
Edit the services grid in `index.html` to add/remove service cards

### Updating Contact Information
Update the contact details in `index.html`:
- Email
- Phone number
- Location

## 🔐 Security

- Payment processing via trusted Flutterwave gateway
- No sensitive data stored locally except theme preferences
- HTTPS recommended for production deployment

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Optimization

- Lazy loading for images
- Minified CSS and JavaScript
- Efficient animations using CSS transforms
- Optimized media queries for responsive design
- LocalStorage for theme persistence
- Immediate theme initialization to prevent flash of unstyled content

## 🐛 Troubleshooting

### Theme not persisting?
- Check if localStorage is enabled in your browser
- Clear browser cache and cookies
- Check browser console for errors

### Images not loading?
- Check internet connection
- Verify image URLs are correct
- Use relative paths for local images

### Payment not working?
- Verify Flutterwave credentials
- Check internet connection
- Ensure popup blockers are disabled
- Check browser console for API errors

### Theme not applied immediately?
- Theme initialization script runs before DOM loads
- If flash occurs, update script.js with IIFE initialization

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
git add .
git commit -m "Deploy changes"
git push origin main
```

### Deploy to Other Platforms
- **Netlify**: Connect GitHub repo and auto-deploy
- **Vercel**: Similar process as Netlify
- **Traditional Hosting**: Upload files via FTP

## 📝 File Descriptions

### `index.html`
Main landing page with hero section, services, and features

### `about.html`
Detailed information about the company, mission, values, and team

### `projects.html`
Portfolio showcase with featured project cards

### `style.css`
All styling including:
- Theme definitions
- Responsive layouts
- Animations and transitions
- Component styles
- Desktop hover effects

### `script.js`
JavaScript functionality:
- Immediate theme initialization (IIFE)
- Theme management and persistence
- Mobile menu toggle
- Draggable theme button
- Form submissions
- Payment processing
- Scroll animations

### `logo.png`
Company logo image

## 📧 Contact

- **Email**: Okafordavis8@gmail.com
- **Phone/Telegram**: +234 916 109 1132
- **Location**: Abuja, Nigeria

## 📄 License

© 2025 WebCrest. All rights reserved.

## 🙏 Acknowledgments

- **AOS Library**: Animate On Scroll
- **Font Awesome**: Icon library
- **SweetAlert2**: Beautiful alerts
- **Flutterwave**: Payment processing

## 🔄 Version History

### Version 1.1 (Current)
- Added immediate theme initialization
- Enhanced desktop hover effects
- Improved logo animations
- Better form styling
- All markdown documentation consolidated into single README

### Version 1.0
- Initial release
- Three theme modes (Dark, Light, Modern)
- Five accent color options
- Responsive design
- Payment integration
- Contact forms
- Portfolio showcase

## 📊 Code Statistics

- **HTML Files**: 3
- **CSS Lines**: ~2500+
- **JavaScript Lines**: ~550+
- **Animations**: 20+
- **Theme Combinations**: 15 (3 themes × 5 colors)
- **Hover Effects**: 15+

## 🎓 Learning Resources

This project demonstrates:
- Modern HTML5 practices
- Advanced CSS with custom properties and animations
- ES6+ JavaScript features (IIFE, Arrow functions)
- Responsive web design
- Animation techniques
- LocalStorage usage
- API integration
- Drag and drop functionality
- Event delegation

## 🤝 Contributing

For improvements and suggestions:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

---

**Last Updated**: March 23, 2026

Made with ❤️ by WebCrest Team

Welcome to **BST Developments** — a modern portfolio showcasing my expertise in building stunning, responsive websites for businesses, personal brands, and organizations.

## 🌐 Live Demo
Host this site on **GitHub Pages** or Netlify for free and share it with clients or employers.

## 📁 Project Structure