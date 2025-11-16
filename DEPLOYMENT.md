# Deployment Guide

## Overview
This guide covers deploying the Real-Time Chat Application to production environments.

---

## Server Deployment

### Option 1: Render.com (Recommended)

**Steps:**

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: socketio-chat-server
   Environment: Node
   Region: Choose closest to users
   Branch: main
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**
   ```
   PORT=5000 (auto-set by Render)
   CLIENT_URL=https://your-client-url.vercel.app
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Note your server URL: `https://your-app.onrender.com`

**Pros:**
- Free tier available
- Auto-deploys on git push
- Built-in SSL
- Easy setup

**Cons:**
- Free tier spins down after inactivity
- Cold start delay

---

### Option 2: Railway.app

**Steps:**

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Select `server` as root directory
   - Railway auto-detects Node.js

4. **Environment Variables**
   ```
   CLIENT_URL=https://your-client-url.vercel.app
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway automatically deploys
   - Get your URL from settings

**Pros:**
- Fast deployment
- Good free tier
- No cold starts
- Great DX

**Cons:**
- Free tier has usage limits

---

### Option 3: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd server
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set CLIENT_URL=https://your-client-url.vercel.app
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

**Pros:**
- Mature platform
- Good documentation
- Add-ons available

**Cons:**
- No free tier anymore
- More expensive

---

## Client Deployment

### Option 1: Vercel (Recommended)

**Steps:**

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   ```
   VITE_SOCKET_URL=https://your-server.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Get your URL: `https://your-app.vercel.app`

**Pros:**
- Free tier generous
- Instant deployments
- Auto-preview deployments
- Built-in SSL
- CDN included

**Cons:**
- None for this use case

---

### Option 2: Netlify

**Steps:**

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select repository

3. **Build Settings**
   ```
   Base directory: client
   Build command: npm run build
   Publish directory: client/dist
   ```

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_SOCKET_URL=https://your-server.onrender.com`

5. **Deploy**
   - Click "Deploy site"
   - Get your URL

**Pros:**
- Free tier available
- Easy setup
- Good performance

**Cons:**
- Slightly slower than Vercel

---

### Option 3: GitHub Pages

**Steps:**

1. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
     build: {
       outDir: 'dist'
     }
   })
   ```

2. **Install gh-pages**
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

3. **Add Deploy Script to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to repo Settings → Pages
   - Source: gh-pages branch
   - Save

**Pros:**
- Free
- Simple for static sites

**Cons:**
- More manual setup
- Slower than Vercel/Netlify

---

## Post-Deployment Configuration

### Update CORS Settings

**Server (server.js):**
```javascript
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://your-app.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
```

### Update Environment Variables

**Client (.env):**
```
VITE_SOCKET_URL=https://your-server.onrender.com
```

**Server (.env):**
```
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
```

---

## Testing Production Deployment

1. **Open deployed client URL**
2. **Test all features:**
   - Login
   - Send messages
   - Switch rooms
   - Upload files
   - Add reactions
   - Search messages
   - Check notifications

3. **Test with multiple users:**
   - Open in different browsers
   - Test real-time sync
   - Verify all features work

4. **Check for errors:**
   - Browser console
   - Server logs (on hosting platform)

---

## Monitoring

### Render
- Dashboard shows logs
- Metrics available
- Set up alerts

### Vercel
- Analytics dashboard
- Real-time logs
- Performance insights

### Railway
- Logs in dashboard
- Metrics available
- Usage tracking

---

## Troubleshooting

### Issue: Socket connection fails

**Solution:**
- Check CORS settings
- Verify environment variables
- Check server logs
- Ensure HTTPS on both client and server

### Issue: Files not uploading

**Solution:**
- Check file size limits
- Verify server has enough memory
- Check network timeout settings

### Issue: Notifications not working

**Solution:**
- Ensure HTTPS (required for browser notifications)
- Check browser permissions
- Verify notification code

### Issue: Cold start delays (Render free tier)

**Solution:**
- Upgrade to paid tier
- Use Railway instead
- Implement keep-alive ping

---

## Recommended Setup

**For Development:**
- Server: Local (npm run dev)
- Client: Local (npm run dev)

**For Production:**
- Server: Render.com or Railway.app
- Client: Vercel
- Database: (if adding persistence) MongoDB Atlas

**Cost:**
- Free tier: $0/month (with limitations)
- Paid tier: ~$7-15/month (no limitations)

---

## Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use platform environment variable settings
   - Rotate secrets regularly

2. **CORS**
   - Only allow specific origins
   - Don't use wildcard (*) in production

3. **Rate Limiting**
   - Consider adding rate limiting
   - Prevent spam/abuse

4. **Input Validation**
   - Validate all user inputs
   - Sanitize messages
   - Check file types/sizes

5. **HTTPS**
   - Always use HTTPS in production
   - Required for notifications
   - Required for secure WebSocket

---

## Scaling Considerations

### For High Traffic:

1. **Use Redis for Socket.io**
   - Enables horizontal scaling
   - Multiple server instances

2. **Add Database**
   - MongoDB for message persistence
   - PostgreSQL for user data

3. **CDN for Files**
   - Use S3 or Cloudinary
   - Don't store files in memory

4. **Load Balancer**
   - Distribute traffic
   - Handle failover

---

## Maintenance

### Regular Tasks:
- [ ] Update dependencies monthly
- [ ] Check server logs weekly
- [ ] Monitor error rates
- [ ] Review user feedback
- [ ] Test all features after updates
- [ ] Backup data (if using database)

### Updates:
```bash
# Update server dependencies
cd server
npm update

# Update client dependencies
cd client
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

---

## Support

For deployment issues:
- Check hosting platform documentation
- Review server logs
- Test locally first
- Check environment variables
- Verify CORS settings
