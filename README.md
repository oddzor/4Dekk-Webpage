# 4Dekk Auto Repair Website

A modern, responsive website for 4Dekk Auto Repair built with Next.js, TypeScript, and Tailwind CSS. This website is designed to showcase auto repair services, facilitate online booking, and provide excellent user experience for customers.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Built with Next.js for excellent search engine optimization
- **Fast Performance**: Optimized images, code splitting, and static generation
- **Contact Form**: Functional contact form for customer inquiries
- **Service Showcase**: Detailed service pages with pricing information
- **Testimonials**: Customer testimonials with carousel functionality
- **Booking Integration**: Ready for third-party booking widget integration
- **Google Maps**: Embedded maps for location visibility
- **Accessibility**: WCAG 2.1 compliant with proper semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
4Dekk-Homepage/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── booking/           # Booking page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── blog/              # Blog page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section
│   ├── ServicesSection.tsx # Services showcase
│   ├── TestimonialSection.tsx # Customer testimonials
│   ├── AboutSection.tsx   # About section
│   ├── ContactSection.tsx # Contact section
│   ├── ServiceCard.tsx    # Service card component
│   ├── TestimonialCard.tsx # Testimonial card
│   └── ContactForm.tsx    # Contact form
├── data/                  # Static data
│   ├── services.json      # Service information
│   └── testimonials.json  # Customer testimonials
├── public/                # Static assets
│   └── images/            # Website images
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 4Dekk-Homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your content**
   Update the business information, contact details, and images to match your auto repair shop.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Configuration

### Customizing Content

1. **Update business information** in `app/layout.tsx`
2. **Modify services** in `data/services.json`
3. **Update testimonials** in `data/testimonials.json`
4. **Change contact details** in `components/Footer.tsx` and `components/ContactSection.tsx`

### Styling

The website uses Tailwind CSS with custom colors defined in `tailwind.config.js`:

- **Primary**: #003366 (Dark blue)
- **Secondary**: #CC0000 (Red)
- **Accent**: #FFCC00 (Yellow)
- **Background**: #FFFFFF (White)
- **Text**: #333333 (Dark gray)

### Images

Replace placeholder images in `public/images/` with your actual shop photos:
- `hero-bg.webp` - Hero section background
- `tire-service.webp` - Tire service image
- `brake-repair.webp` - Brake repair image
- `oil-change.webp` - Oil change image
- `engine-diagnostics.webp` - Engine diagnostics image
- `transmission.webp` - Transmission service image

## 🔧 Third-Party Integrations

### Booking Widget

To integrate a booking widget (Calendly, Acuity, etc.):

1. Sign up for your preferred booking service
2. Configure your available times and services
3. Get the embed code
4. Replace the placeholder in `app/booking/page.tsx`

### Google Maps

Update the Google Maps embed URL in:
- `components/ContactSection.tsx`
- `app/contact/page.tsx`

### Contact Form

The contact form is set up to collect customer inquiries. You can integrate it with your preferred contact management system or email service.

## 📱 Responsive Design

The website is fully responsive and tested on:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large Desktop (1920px+)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 📊 Performance

The website is optimized for:
- **Core Web Vitals**: Excellent scores on Lighthouse
- **SEO**: Proper meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile**: Fast loading on mobile devices

## 🔒 Security

- Form validation and sanitization
- CSRF protection
- Secure headers configuration
- Environment variable protection

## 📞 Support

For questions or support:
- Email: info@4dekk.com
- Phone: (555) 123-4567

## 📄 License

This project is proprietary software for 4Dekk Auto Repair.

## 🎯 Next Steps

1. **Replace placeholder content** with actual business information
2. **Add real images** of your shop and services
3. **Integrate contact form** with your preferred contact management system
4. **Integrate booking widget** for online appointments
5. **Set up Google Analytics** for tracking
6. **Configure Google My Business** for local SEO
7. **Test on various devices** and browsers
8. **Deploy to production** and monitor performance

---

Built with ❤️ for 4Dekk Auto Repair