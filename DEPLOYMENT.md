# 🚀 KIVO AI Deployment Guide

## Overview

This guide will help you deploy the KIVO AI platform to GitHub Pages so users can access it at **https://eddykim0118.github.io/kivo/**

## 📋 Prerequisites

1. **GitHub Repository**: Ensure your code is in a GitHub repository
2. **Node.js**: Version 16 or higher
3. **npm**: Package manager

## 🛠️ Step-by-Step Deployment

### Step 1: Build the Application

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Build the application for production
npm run build
```

### Step 2: Deploy to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

This command will:
- Build the application
- Create a `gh-pages` branch
- Push the built files to GitHub Pages
- Make your app available at `https://eddykim0118.github.io/kivo/`

### Step 3: Configure GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Set **Source** to "Deploy from a branch"
4. Select **gh-pages** branch
5. Set folder to **/(root)**
6. Click **Save**

## 🌐 User Access Flow

### Option 1: Direct Dashboard Access
Users can access the dashboard directly at:
- **https://eddykim0118.github.io/kivo/dashboard**

### Option 2: Landing Page Flow
Users visit the main site and get redirected:
1. **Landing Page**: `https://eddykim0118.github.io/kivo/`
2. **Auto-redirect**: After 3 seconds, users are taken to the dashboard
3. **Manual Launch**: Users can click "Launch Dashboard" button

## 📱 Available Routes

| Route | Description | Access |
|-------|-------------|---------|
| `/` | Landing page | Main entry point |
| `/dashboard` | Main dashboard | Direct access |
| `/upload` | Data upload | Via dashboard |
| `/sales` | Sales predictions | Via dashboard |
| `/marketing` | Marketing insights | Via dashboard |
| `/chat` | AI assistant | Via dashboard |
| `/demo` | Workflow demo | Via dashboard |

## 🔧 Configuration Files

### package.json
```json
{
  "homepage": "https://eddykim0118.github.io/kivo",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### App.tsx Routing
The app uses React Router with the following structure:
- Landing page as default route (`/`)
- Dashboard and features as sub-routes
- Automatic redirects for unknown routes

## 🎯 User Experience

### Landing Page Features
- **Professional Design**: Gradient background with modern UI
- **Feature Overview**: Highlights key capabilities
- **Platform Integration**: Shows supported platforms (Google, Meta, TikTok, Yelp)
- **Call-to-Action**: Clear buttons to launch the dashboard
- **Auto-redirect**: Automatically takes users to dashboard after 3 seconds

### Dashboard Features
- **Overview Metrics**: Key performance indicators
- **Navigation**: Easy access to all features
- **Responsive Design**: Works on all devices
- **Real-time Data**: Mock data for demonstration

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Deployment Fails**
   ```bash
   # Check if gh-pages is installed
   npm install gh-pages --save-dev
   
   # Try manual deployment
   npm run build
   npx gh-pages -d build
   ```

3. **Routing Issues**
   - Ensure `homepage` is set correctly in `package.json`
   - Check that all routes are properly configured in `App.tsx`

4. **Page Not Found (404)**
   - GitHub Pages might need time to update (5-10 minutes)
   - Check the `gh-pages` branch exists
   - Verify the build files are in the correct location

### GitHub Pages Settings

1. **Repository Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages`
4. **Folder**: `/(root)`
5. **Custom domain**: (optional)

## 📊 Monitoring

### Check Deployment Status
1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Look for deployment status

### Verify Live Site
1. Visit `https://eddykim0118.github.io/kivo/`
2. Check that the landing page loads
3. Test the "Launch Dashboard" button
4. Verify all routes work correctly

## 🔄 Updating the Deployment

To update your live site:

```bash
# Make your changes
# Commit and push to main branch
git add .
git commit -m "Update features"
git push origin main

# Deploy the updated version
cd frontend
npm run deploy
```

## 📈 Performance Optimization

### Build Optimization
- The build process automatically optimizes assets
- Images are compressed
- JavaScript is minified
- CSS is optimized

### Loading Performance
- Lazy loading for components
- Optimized bundle sizes
- Fast initial page load

## 🔒 Security Considerations

- **Client-side Only**: All processing happens in the browser
- **No Sensitive Data**: Only mock data is used
- **HTTPS**: GitHub Pages provides SSL by default
- **No Backend**: No server-side vulnerabilities

## 📞 Support

If you encounter issues:

1. **Check the console** for error messages
2. **Verify all dependencies** are installed
3. **Ensure Node.js version** is compatible
4. **Check GitHub Pages status** in repository settings

## 🎉 Success!

Once deployed, users can access your KIVO AI platform at:
**https://eddykim0118.github.io/kivo/**

The platform provides a complete business intelligence experience with:
- Professional landing page
- AI-powered analytics dashboard
- Multi-platform marketing insights
- Interactive chat assistant
- Complete workflow demonstration

---

**KIVO AI** - Transforming business intelligence with AI-powered analytics 