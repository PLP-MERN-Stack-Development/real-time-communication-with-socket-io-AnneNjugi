# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Start the Application (1 minute)

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```
✅ Server running at: `http://localhost:5000`

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```
✅ Client running at: `http://localhost:5174` (or 5173)

### Step 3: Test It! (2 minutes)

1. Open browser to `http://localhost:5174`
2. Enter username: "Alice"
3. Click "Join Chat"
4. Open another browser window (incognito)
5. Enter username: "Bob"
6. Start chatting!

---

## 🎯 Quick Feature Tour

### Send a Message
1. Type in the input box at bottom
2. Press Enter or click "Send"

### Switch Rooms
1. Click on room names in left sidebar
2. Try "General", "Random", or "Tech Talk"

### Upload a File
1. Click 📎 icon next to message input
2. Select an image or file
3. File appears in chat

### Add Reaction
1. Hover over any message
2. Click "+" button
3. Select an emoji

### Search Messages
1. Click 🔍 icon in header
2. Type search term
3. View results

### Change Status
1. Click status indicator in header
2. Select Online/Away/Busy

---

## 🔧 Troubleshooting

### Port Already in Use?
```bash
# Change port in client/.env
VITE_SOCKET_URL=http://localhost:5000

# Or kill the process using the port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Connection Failed?
1. Check server is running (Terminal 1)
2. Check client is running (Terminal 2)
3. Verify URLs in .env files match
4. Clear browser cache and reload

### File Upload Not Working?
1. Check file size (max 5MB)
2. Try a different file type
3. Check browser console for errors

---

## 📱 Test Scenarios

### Scenario 1: Basic Chat (1 min)
- Open 2 browser windows
- Login with different names
- Send messages back and forth
- ✅ Messages appear in real-time

### Scenario 2: Rooms (1 min)
- Switch to "Random" room
- Send a message
- Switch back to "General"
- ✅ Messages are room-specific

### Scenario 3: Reactions (30 sec)
- Send a message
- Click "+" on the message
- Select 👍 emoji
- ✅ Reaction appears

### Scenario 4: Files (1 min)
- Click 📎 icon
- Select an image
- ✅ Image appears in chat

### Scenario 5: Search (30 sec)
- Send several messages
- Click 🔍 icon
- Search for a word
- ✅ Results appear

---

## 🎨 Customization

### Change Colors
Edit `client/src/components/*.css` files:
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your colors */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Add More Rooms
Edit `server/server.js`:
```javascript
const rooms = {
  general: { name: 'General', messages: [], unreadCount: {} },
  random: { name: 'Random', messages: [], unreadCount: {} },
  tech: { name: 'Tech Talk', messages: [], unreadCount: {} },
  // Add your room:
  gaming: { name: 'Gaming', messages: [], unreadCount: {} }
};
```

### Change File Size Limit
Edit `client/src/components/FileUpload.jsx`:
```javascript
// Current: 5MB
if (file.size > 5 * 1024 * 1024) {

// Change to 10MB:
if (file.size > 10 * 1024 * 1024) {
```

---

## 📚 Next Steps

1. ✅ **Test all features** - Use TESTING_GUIDE.md
2. 🚀 **Deploy** - Follow DEPLOYMENT.md
3. 📖 **Read docs** - Check README.md for details
4. 🎨 **Customize** - Make it your own!
5. 🐛 **Report issues** - Document any bugs found

---

## 🆘 Need Help?

1. **Setup Issues** → Check README.md
2. **Feature Questions** → Check FEATURES.md
3. **Testing** → Check TESTING_GUIDE.md
4. **Deployment** → Check DEPLOYMENT.md
5. **Everything Else** → Check PROJECT_SUMMARY.md

---

## ✨ Pro Tips

1. **Use Incognito Mode** - Test multiple users easily
2. **Check Console** - F12 for debugging
3. **Watch Server Logs** - See real-time events
4. **Test on Mobile** - Resize browser window
5. **Try Edge Cases** - Empty messages, large files, etc.

---

## 🎉 You're Ready!

Your real-time chat application is now running. Enjoy exploring all the features!

**Current Status:**
- ✅ Server: Running on port 5000
- ✅ Client: Running on port 5174
- ✅ All features: Working
- ✅ Ready to test: YES

**Happy Chatting! 💬**
