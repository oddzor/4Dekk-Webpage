# Vercel Deployment Guide - Automated Review Refresh

## 🚀 Complete Vercel Setup with Monthly Auto-Refresh

### **Step 1: Environment Variables**

In your Vercel dashboard, add these environment variables:

```bash
# Outscraper API Key (get from outscraper.com)
OUTSCRAPER_API_KEY=your_outscraper_api_key_here

# Admin password for manual refresh (choose any secure password)
ADMIN_REFRESH_PASSWORD=your_secure_admin_password

# Cron secret for automated refresh (choose a random string)
CRON_SECRET=your_random_secret_key_here

# Keep your Google API key as backup
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

### **Step 2: Deploy to Vercel**

1. **Push your code to GitHub**
2. **Connect repository to Vercel**
3. **Add environment variables** in Vercel dashboard:
   - Go to **Project Settings** → **Environment Variables**
   - Add all 4 variables above

### **Step 3: Automatic Monthly Refresh**

✅ **Already configured!** The `vercel.json` file sets up:
- **Cron job** runs 1st of every month at 2 AM UTC
- **Fetches fresh reviews** from Outscraper (all 250+ reviews)
- **Caches for 30 days** for fast loading
- **Stays in free tier** (1 API call per month)

## 🔧 **How It Works**

### **User Visits Site:**
- Loads reviews from 30-day cache (instant)
- No API calls = fast & free

### **Monthly Auto-Refresh (1st of month):**
- Vercel cron triggers `/api/cron/refresh-reviews`
- Fetches ALL reviews from Outscraper
- Updates cache with fresh data
- Users see updated reviews on next visit

### **Manual Refresh (if needed):**
- Visit: `https://yourdomain.com/admin/reviews`
- Enter admin password
- Force immediate refresh

## 📊 **Benefits**

- 🆓 **Free forever** (stays under Outscraper limits)
- ⚡ **Fast loading** (cached reviews)
- 🤖 **Fully automated** (no maintenance needed)
- 📈 **All reviews** (not just Google's 5-review limit)
- 🔄 **Always fresh** (monthly updates)
- 🛡️ **Backup system** (falls back to Google Places API)

## 🧪 **Testing**

### **Test Manual Refresh:**
1. Go to `/admin/reviews`
2. Enter your admin password
3. Click "Refresh Reviews Cache"

### **Test Cron Endpoint:**
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
     https://yourdomain.vercel.app/api/cron/refresh-reviews
```

## 📝 **Monitoring**

### **Check if auto-refresh worked:**
- **Browser console:** Look for "Loaded X reviews (cached: false)" after the 1st
- **Vercel Functions tab:** Check cron job execution logs
- **Admin panel:** Shows last cache update time

### **Vercel Dashboard:**
- Go to **Functions** tab to see cron job runs
- Check **Edge Config** for any issues

## ⚙️ **Configuration Files**

### **vercel.json** (already set up):
- Defines monthly cron schedule
- Sets 60-second timeout for API calls

### **API Routes:**
- `/api/reviews-cached` - Main endpoint (30-day cache)
- `/api/cron/refresh-reviews` - Auto-refresh endpoint
- `/admin/reviews` - Manual refresh UI

## 🎯 **You're All Set!**

Your review system will now:
1. **Auto-refresh monthly** via Vercel cron
2. **Stay completely free** (under API limits)
3. **Load lightning fast** (cached data)
4. **Show all your reviews** (not just 5)
5. **Require zero maintenance**

Just deploy to Vercel and you're done! 🎉
