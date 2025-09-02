# Google Reviews Setup Guide

## Prerequisites

To use the Google Reviews integration, you'll need:

1. **Google Place ID** for your business
2. **Google Places API Key** (required for the new implementation)

## Getting Your Google Place ID

### Method 1: Using Google Maps
1. Go to [Google Maps](https://maps.google.com)
2. Search for your business: "4Dekk Larvik"
3. Click on your business listing
4. In the URL, you'll see something like: `https://www.google.com/maps/place/4Dekk+Larvik/@59.0533,10.0297,17z/`
5. The Place ID is usually in the URL or you can find it in the business details

### Method 2: Using Google Place ID Finder
1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Search for "4Dekk Larvik"
3. Copy the Place ID from the results

### Method 3: Using Google My Business
1. Log into [Google My Business](https://business.google.com)
2. Select your business
3. Go to Info tab
4. Look for the Place ID in the business information

## Getting Your Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
5. Restrict the API key (recommended):
   - Click on the created API key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `localhost:3000/*` for development)
   - Under "API restrictions", select "Restrict key" and choose "Places API"

## Configuration

### 1. Environment Variables
Create a `.env.local` file in your project root and add:

```bash
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
```

### 2. Update Place ID
In `components/GoogleReviews.tsx`, update the placeId variable:

```typescript
const placeId = 'YOUR_ACTUAL_PLACE_ID' // Replace with your real Place ID
```

## How It Works

The new implementation:

1. **Server-side API**: Creates a secure API route at `/api/reviews` that fetches reviews using your API key
2. **Client-side Component**: Displays reviews in a beautiful carousel with navigation
3. **Security**: API key is never exposed to the client
4. **Performance**: Reviews are fetched once and cached on the client

## Features

- ✅ Displays overall rating and total review count
- ✅ Carousel navigation with auto-advance
- ✅ Responsive design
- ✅ Loading and error states
- ✅ Accessible navigation controls
- ✅ Star rating display
- ✅ Integration with existing TestimonialCard component

## Troubleshooting

### If reviews don't load:
1. Verify your Place ID is correct
2. Check if your business has Google reviews
3. Ensure your business is properly listed on Google Maps
4. Check browser console for any error messages
5. Verify your API key is correct and has Places API enabled

### If you get API errors:
1. Check the browser's Network tab for the `/api/reviews` request
2. Verify your `.env.local` file has the correct API key
3. Ensure the Places API is enabled in Google Cloud Console
4. Check if your API key has proper restrictions

### Common Error Messages:
- **"Google Places API key not configured"**: Add your API key to `.env.local`
- **"Place ID is required"**: Check the placeId variable in the component
- **"Google Places API error: REQUEST_DENIED"**: Check API key restrictions and enable Places API

## Testing

After setup:
1. Create `.env.local` with your API key
2. Restart your development server
3. Refresh your website
4. Check if Google reviews are loading
5. Test the carousel navigation
6. Verify the star ratings display correctly

## Security Notes

- The API key is stored server-side in environment variables
- Never commit `.env.local` to version control
- The Places API has usage quotas and rate limits
- Consider implementing caching for production use

## Production Deployment

When deploying to production:
1. Set the `GOOGLE_PLACES_API_KEY` environment variable on your hosting platform
2. Update API key restrictions to only allow your production domain
3. Monitor API usage in Google Cloud Console
4. Consider implementing caching to reduce API calls

## Example Place ID Format
Place IDs typically look like: `ChIJN1t_tDeuEmsRUsoyG83frY4`

## Support

If you continue to have issues:
1. Check the Google Places API documentation
2. Verify your business listing on Google Maps
3. Test your API key with the Google Places API testing tools
4. Check the browser console and network tab for detailed error information


