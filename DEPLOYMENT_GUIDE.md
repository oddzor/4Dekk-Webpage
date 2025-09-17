# 4Dekk Homepage - Deployment Guide

## Overview

Your Next.js application can be deployed to traditional web hosting in two ways:

### Option 1: Static Export (Recommended for Traditional Hosting)
### Option 2: Node.js Hosting (Recommended for Full Features)

---

## Option 1: Static Export for Traditional Web Hosting

This option exports your app as static HTML/CSS/JS files that work on any web server.

### ⚠️ Limitations
- **API Routes won't work** - Your Google Reviews API (`/api/reviews`) will be disabled
- Google Reviews will fall back to error state or you'll need alternative solutions

### ✅ Benefits
- Works on any web host (shared hosting, Apache, Nginx, etc.)
- Fast loading times
- No server requirements
- Cheap hosting options

### Deployment Steps

1. **Build for static export:**
   ```bash
   npm run build:static
   ```

2. **Upload files:**
   - The static files will be in the `out/` folder
   - Upload the entire contents of `out/` to your web host's public_html folder
   - Your site will be available at your domain

3. **Configure your web server:**
   - Ensure your web host supports `.html` file serving
   - Set up proper redirects if needed

### Handling Google Reviews in Static Mode

Since API routes don't work, you have these options:

1. **Remove Google Reviews** (simplest)
2. **Use static testimonials** (add them to your data files)
3. **Use client-side Google Places API** (requires CORS setup)
4. **Use a third-party service** (like Trustpilot widget)

---

## Option 2: Node.js Hosting (Full Features)

This keeps all features including your Google Reviews API.

### Requirements
- Web host that supports Node.js (many shared hosts don't)
- Examples: DigitalOcean, Linode, VPS, dedicated server

### Deployment Steps

1. **Prepare for production:**
   ```bash
   npm run build
   ```

2. **Upload your project:**
   - Upload entire project folder to your server
   - Install dependencies: `npm install --production`

3. **Set environment variables:**
   ```bash
   export GOOGLE_PLACES_API_KEY="your_api_key_here"
   export NODE_ENV="production"
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Set up process manager (PM2):**
   ```bash
   npm install -g pm2
   pm2 start npm --name "4dekk-homepage" -- start
   pm2 startup
   pm2 save
   ```

---

## FREE Hosting with Custom Domain (Recommended)

### 🥇 Vercel (Best Option)
**100% Free + Custom Domain + All Features**

**Setup Steps:**
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

3. **Add Custom Domain:**
   - In Vercel dashboard → Project → Settings → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Add both: `yourdomain.com` AND `www.yourdomain.com`
   - Vercel will show you DNS records to add

4. **Configure DNS (at your domain registrar):**
   
   **For Root Domain (`yourdomain.com`):**
   ```
   Type: A Record
   Name: @ (or leave blank)
   Value: 76.76.19.61
   ```
   
   **For WWW Subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
   
   **Result:** Both `yourdomain.com` and `www.yourdomain.com` will work!

5. **Add Environment Variables:**
   - In Vercel dashboard → Project → Settings → Environment Variables
   - Add: `GOOGLE_PLACES_API_KEY` = `your_api_key`

### 🌐 How Your Custom Domain Works

**After DNS setup (24-48 hours max):**
- ✅ Visitors type `yourdomain.com` → see your site
- ✅ Browser URL shows `yourdomain.com` (NOT vercel.app)
- ✅ Free SSL certificate automatically applied
- ✅ Automatic redirect from `http://` to `https://`
- ✅ You can set which domain is primary (with/without www)

**DNS Configuration Examples:**

If your domain is `4dekk.no`:
```
A Record: @ → 76.76.19.61        (points 4dekk.no to Vercel)
CNAME: www → cname.vercel-dns.com (points www.4dekk.no to Vercel)
```

**Where to configure DNS:**
- **Domeneshop.no:** Logg inn → Domener → [Your Domain] → DNS-administrasjon
- **GoDaddy:** DNS Management → DNS Records
- **Namecheap:** Advanced DNS → Host Records  
- **Cloudflare:** DNS → Records
- **Your registrar:** Look for "DNS Management" or "Name Servers"

### 🇳🇴 Domeneshop.no Specific Instructions

**Step 1: Log into Domeneshop**
1. Go to [domeneshop.no](https://domeneshop.no)
2. Click "Logg inn" (top right)
3. Enter your credentials

**Step 2: Access DNS Settings**
1. Click "Domener" in the menu
2. Find your domain and click on it
3. Click "DNS-administrasjon" or "DNS-innstillinger"

**Step 3: Add DNS Records**
1. **For root domain (yourdomain.no):**
   ```
   Type: A
   Navn: @ (or leave empty)
   Verdi: 76.76.19.61
   TTL: 3600 (or default)
   ```

2. **For www subdomain:**
   ```
   Type: CNAME
   Navn: www
   Verdi: cname.vercel-dns.com
   TTL: 3600 (or default)
   ```

**Step 4: Save Changes**
- Click "Lagre" or "Oppdater"
- Changes take 1-48 hours to propagate (usually much faster)

**Note:** Remove any existing A or CNAME records that point to your old hosting if they exist.

**Verification:**
- Vercel will show ✅ when domain is properly configured
- Test both `yourdomain.com` and `www.yourdomain.com`

### 🥈 Netlify (Static Export)
**Free + Custom Domain (No API Routes)**

**Setup Steps:**
1. **Build static version:**
   ```bash
   npm run build:static
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `out/` folder
   - Or connect GitHub repository

3. **Add Custom Domain:**
   - In Netlify dashboard → Site Settings → Domain Management
   - Add your domain
   - Follow DNS configuration instructions

### 🥉 Railway (Free Credits)
**$5 monthly credits + Custom Domain + All Features**

**Setup Steps:**
1. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub
   - Deploy your repository

2. **Add Custom Domain:**
   - In Railway dashboard → Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

---

## Files Modified for Static Export

I've already configured your project for static export:

- ✅ `next.config.js` - Added static export configuration
- ✅ `package.json` - Added `build:static` script

---

## Next Steps

Choose your deployment method:

### For Traditional Web Hosting (Static):
1. Run `npm run build:static`
2. Upload `out/` folder contents to your web host
3. Consider removing Google Reviews or using alternatives

### For Modern Hosting (Full Features):
1. Choose a Node.js hosting platform
2. Deploy with all features intact
3. Set up environment variables
4. Configure your domain

---

## Need Help?

If you need assistance with:
- Setting up environment variables
- Removing Google Reviews for static deployment
- Choosing a hosting platform
- Domain configuration

Just let me know which option you'd like to pursue!
