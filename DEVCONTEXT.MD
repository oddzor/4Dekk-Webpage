# Context Document for Tire/Mechanic/Repair Shop Website Development

## Project Overview
The goal is to develop a fully responsive, SEO-optimized website for a tire/mechanic/repair shop to enhance its online presence. The website must feature fast loading times, a professional appearance aligned with the automotive industry, and integrate a third-party booking service for 600–1200 monthly bookings. Built with Next.js and Tailwind CSS, the site will prioritize small, reusable components, minimal NPM dependencies, and fallbacks for components and images. The document is designed for use in AI-powered IDEs to maintain context throughout development.

## Tech Stack
- **Framework**: Next.js (React) for SEO-friendly static site generation (SSG) and server-side rendering (SSR).
- **Styling**: Tailwind CSS for rapid, consistent, and responsive design.
- **Deployment**: Vercel for optimized hosting with a global CDN.
- **Optional Dependencies**:
  - `@headlessui/react` for accessible UI components.
  - `heroicons` for icons.
  - `react-hook-form` for form handling.
  - `nodemailer` for contact form email submissions (if using Next.js API routes).

## Page Structure
The website will consist of the following pages, each designed to be informative, user-friendly, and optimized for SEO:

1. **Home Page**: Introduces the shop with a hero section, featured services, testimonials, an about snippet, and contact information with a map.
2. **Services Page**: Lists all services with detailed descriptions and optional pricing.
3. **About Us Page**: Details the shop’s history, team members, and mission/values.
4. **Booking Page**: Embeds the third-party booking widget with instructions.
5. **Contact Page**: Includes a contact form, shop details, and a Google Map.
6. **Blog Page (Optional)**: Features articles for SEO and customer engagement.

## Component Breakdown
Components are kept small, reusable, and composable to ensure maintainability and scalability.

### Global Components
- **Header**: Contains the logo and navigation menu (Home, Services, About, Booking, Contact, Blog). Uses a sticky header for easy access.
- **Footer**: Includes copyright, social media links, and quick links to main pages.

### Home Page Components
- **HeroSection**: Full-width background image or video (e.g., technicians at work), shop name, tagline, and a prominent “Book Now” CTA button linking to the Booking Page.
- **ServicesSection**: Grid of 3–4 `ServiceCard` components, each with an icon/image, title, short description, and “Learn More” link to the Services Page.
- **GoogleReviews**: Carousel of real Google reviews using `TestimonialCard` components, each displaying a customer quote, name, and rating.
- **AboutSection**: Short paragraph about the shop with a “Read More” link to the About Us Page.
- **ContactSection**: Displays address, phone, email, and a small embedded Google Map with a “Contact Us” link.

### Services Page Components
- **PageTitle**: Displays “Our Services” as the main heading.
- **ServicesList**: Grid of `ServiceDetails` components, each with a title, detailed description, optional image, and pricing.
- **CTAButton**: “Book Now” button linking to the Booking Page.

### About Us Page Components
- **PageTitle**: Displays “About Us” as the main heading.
- **HistorySection**: Text block detailing the shop’s history.
- **TeamSection**: Grid of `TeamMemberCard` components, each with a photo, name, and bio.
- **MissionSection**: Text block outlining the shop’s mission and values.

### Booking Page Components
- **PageTitle**: Displays “Book an Appointment” as the main heading.
- **BookingWidget**: Embeds the third-party booking widget (iframe or JavaScript snippet).
- **Instructions**: Text explaining the booking process.

### Contact Page Components
- **PageTitle**: Displays “Contact Us” as the main heading.
- **ContactForm**: Form with fields for name, email, message, and reCAPTCHA for spam prevention.
- **ContactInfo**: Lists address, phone, and email.
- **Map**: Embedded Google Map showing the shop’s location.

### Blog Page Components (Optional)
- **PageTitle**: Displays “Blog” as the main heading.
- **BlogPostsList**: List of `BlogPostCard` components with titles, excerpts, dates, and links to full articles.
- **Categories**: Sidebar with blog categories or tags.

## Design Guidelines
The design reflects the automotive industry’s aesthetic, ensuring a professional and trustworthy appearance.

### Color Palette
| Color Role   | Hex Code  | Description                     |
|--------------|-----------|---------------------------------|
| Primary      | #003366   | Dark blue for trust and professionalism |
| Secondary    | #CC0000   | Red for energy and urgency      |
| Accent       | #FFCC00   | Yellow for highlights and CTAs  |
| Background   | #FFFFFF   | White for clean backgrounds     |
| Text         | #333333   | Dark gray for readability       |
| Headings     | #000000   | Black for bold headings         |

### Typography
- **Body**: Roboto, sans-serif (clean and modern, available via Google Fonts: [https://fonts.google.com/specimen/Roboto](https://fonts.google.com/specimen/Roboto)).
- **Headings**: Oswald, sans-serif (bold and impactful, available via Google Fonts: [https://fonts.google.com/specimen/Oswald](https://fonts.google.com/specimen/Oswald)).

### Imagery
- Use high-quality images of the shop, technicians, and services (provided by the client).
- Optimize images using Next.js’s `Image` component for WebP format and proper sizing.
- Include descriptive `alt` text for accessibility and SEO.
- Fallback: Display a placeholder image (e.g., a generic car or shop image) if an image fails to load.

### Responsiveness
- Adopt a mobile-first approach using Tailwind CSS utilities (e.g., `sm:`, `md:`, `lg:`).
- Ensure buttons have sufficient padding (e.g., `px-4 py-2`) and are at least 44x44 pixels for touch accessibility.
- Test layouts on devices ranging from 320px (mobile) to 1920px (desktop).

## Functionality Requirements
### Booking Integration
- Embed the third-party booking widget on the Booking Page using an iframe or JavaScript snippet (refer to provider documentation, e.g., Calendly: [https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview)).
- Ensure the widget is responsive and styled to match the site’s design.
- Fallback: Display a message with alternative contact details (e.g., phone number) if the widget fails to load.

### Contact Form
- Fields: Name, Email, Message.
- Use `react-hook-form` for client-side validation.
- Handle submissions via a Next.js API route (`/api/contact`) using `nodemailer` to send emails (see [https://nodemailer.com/](https://nodemailer.com/)).
- Integrate Google reCAPTCHA v3 for spam prevention ([https://developers.google.com/recaptcha/docs/v3](https://developers.google.com/recaptcha/docs/v3)).
- Fallback: Display an error message with alternative contact options if submission fails.

### SEO Optimization
- Use Next.js’s `Head` component to set meta tags (title, description, keywords) for each page.
- Ensure semantic HTML with proper heading structure (H1, H2, etc.).
- Implement structured data (schema.org) for services, reviews, and business details ([https://schema.org/AutoRepair](https://schema.org/AutoRepair)).
- Generate `sitemap.xml` and `robots.txt` using Next.js plugins ([https://www.npmjs.com/package/next-sitemap](https://www.npmjs.com/package/next-sitemap)).
- Include `alt` text for all images and optimize content for relevant keywords (e.g., “tire repair,” “auto mechanic near me”).

### Performance Optimization
- Use SSG for all pages to pre-render content and reduce load times.
- Optimize images with Next.js’s `Image` component for automatic WebP conversion and lazy loading.
- Implement code splitting to load only necessary JavaScript.
- Lazy load below-the-fold content (e.g., testimonials, maps) using `next/dynamic`.
- Minify CSS and JavaScript via Next.js’s built-in optimizations.
- Deploy on Vercel for global CDN and caching ([https://vercel.com/](https://vercel.com/)).
- Audit performance with Lighthouse ([https://developers.google.com/web/tools/lighthouse](https://developers.google.com/web/tools/lighthouse)).

## Third-Party Integrations
- **Booking Service**: Embed the widget as per the provider’s instructions. Ensure it’s responsive and styled consistently.
- **Google Maps**: Embed a map on the Contact Page using an iframe or the Google Maps JavaScript API ([https://developers.google.com/maps/documentation/javascript](https://developers.google.com/maps/documentation/javascript)).
- **reCAPTCHA**: Integrate v3 for the contact form to prevent spam without user interaction.

## Development Guidelines
- **Component Design**: Create small, reusable components (e.g., `ServiceCard`, `TestimonialCard`) to promote modularity.
- **Styling**: Use Tailwind CSS classes for consistency and rapid development. Define custom colors in `tailwind.config.js`.
- **Data Management**: Store dynamic content (services, testimonials, team members) in JSON files (e.g., `data/services.json`) for easy updates without code changes.
- **Error Handling**:
  - Use React Error Boundaries to catch component errors and display fallback UI.
  - Implement skeleton screens for loading states to improve perceived performance.
  - Provide fallback content for failed image loads or booking widget issues.
- **Testing**:
  - Test responsiveness across devices (mobile, tablet, desktop) and browsers (Chrome, Firefox, Safari).
  - Use Lighthouse to audit performance, SEO, and accessibility.
  - Ensure WCAG 2.1 compliance for accessibility (e.g., keyboard navigation, screen reader support).
- **Dependencies**: Limit to essentials (`next`, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `nodemailer`, `react-hook-form`, `@headlessui/react`, `heroicons`).

## Sample Directory Structure
| Path                          | Description                              |
|-------------------------------|------------------------------------------|
| `/pages/index.js`             | Home Page                                |
| `/pages/services.js`          | Services Page                            |
| `/pages/about.js`             | About Us Page                            |
| `/pages/booking.js`           | Booking Page                             |
| `/pages/contact.js`           | Contact Page                             |
| `/pages/blog/index.js`        | Blog Page (optional)                     |
| `/components/Header.js`       | Global Header component                  |
| `/components/Footer.js`       | Global Footer component                  |
| `/components/ServiceCard.js`  | Reusable service card component          |
| `/components/TestimonialCard.js` | Reusable testimonial card component   |
| `/data/services.json`         | Service data for Services Page           |
| `/data/testimonials.json`     | Testimonial data for Home Page           |
| `/public/images/`             | Optimized images for the site            |
| `/pages/api/contact.js`       | API route for contact form submissions   |

## Implementation Steps
1. **Setup**: Initialize a Next.js project (`npx create-next-app`) and install Tailwind CSS ([https://tailwindcss.com/docs/guides/nextjs](https://tailwindcss.com/docs/guides/nextjs)).
2. **Global Components**: Build `Header` and `Footer` with Tailwind CSS for consistent navigation and branding.
3. **Home Page**: Develop components (`HeroSection`, `ServicesSection`, etc.) and fetch data from JSON files.
4. **Other Pages**: Implement Services, About, Booking, and Contact pages, ensuring SEO meta tags and responsiveness.
5. **Booking Integration**: Embed the third-party widget on the Booking Page, testing for compatibility.
6. **Contact Form**: Create the form with `react-hook-form`, integrate reCAPTCHA, and set up the API route.
7. **SEO and Performance**: Add meta tags, structured data, and optimize images. Generate sitemap and robots.txt.
8. **Testing**: Test responsiveness, performance, and accessibility across devices and browsers.
9. **Deployment**: Deploy to Vercel, configure CDN, and verify performance with Lighthouse.

## Inspiration from Top Auto Repair Websites
Based on industry examples ([https://www.cyberoptik.net/blog/best-auto-mechanic-websites/](https://www.cyberoptik.net/blog/best-auto-mechanic-websites/), [https://ueni.com/blog/mechanic-websites/](https://ueni.com/blog/mechanic-websites/)):
- Use high-quality images of technicians in action.
- Include bold CTAs for booking and contact.
- Display customer testimonials prominently.
- Embed Google Maps for location visibility.
- Consider a blog for SEO with maintenance tips.

This context document provides a comprehensive roadmap for developing a high-performance, SEO-optimized website that meets the shop’s needs and your preferences as a frontend developer.