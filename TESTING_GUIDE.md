# Testing Guide

## Quick Start Testing

### Prerequisites
- Both server and client should be running
- Server: `http://localhost:5000`
- Client: `http://localhost:5174` (or 5173)

## Test Scenarios

### 1. Basic Connection Test ✅
**Steps:**
1. Open browser to client URL
2. Enter username "User1"
3. Click "Join Chat"

**Expected:**
- Login screen disappears
- Chat interface loads
- "Connected" status shows in header
- User appears in online users list
- General room is selected by default

---

### 2. Multi-User Chat Test ✅
**Steps:**
1. Open first browser window (User1)
2. Open second browser window in incognito mode (User2)
3. Login with different usernames
4. Send messages from both users

**Expected:**
- Both users see each other in user list
- Messages appear in real-time for both users
- Sender's messages appear on right (purple)
- Other user's messages appear on left (gray)
- Timestamps display correctly

---

### 3. Room Switching Test ✅
**Steps:**
1. Login as User1
2. Send message in General room
3. Click "Random" room
4. Send message in Random room
5. Switch back to General

**Expected:**
- Messages are room-specific
- General room still has original message
- Room switching is instant
- No messages lost

---

### 4. Typing Indicator Test ✅
**Steps:**
1. Open two browser windows (User1, User2)
2. Both in same room
3. User1 starts typing (don't send)

**Expected:**
- User2 sees "User1 is typing..." below messages
- Indicator disappears 1 second after User1 stops typing
- Indicator disappears when User1 sends message

---

### 5. File Upload Test ✅
**Steps:**
1. Login as User1
2. Click 📎 icon
3. Select an image file (< 5MB)
4. Wait for upload

**Expected:**
- Image appears in chat
- Image is clickable/viewable
- Other users see the image
- File name displays for non-image files

---

### 6. Message Reactions Test ✅
**Steps:**
1. Login as User1
2. Send a message
3. Click "+" button on message
4. Select an emoji (e.g., 👍)

**Expected:**
- Emoji appears below message
- Count shows "👍 1"
- Other users see the reaction in real-time
- Multiple reactions can be added

---

### 7. Notifications Test ✅
**Steps:**
1. Login as User1
2. Open second window as User2
3. User2 sends message
4. Check User1's screen

**Expected:**
- Toast notification appears top-right
- Browser notification appears (if permission granted)
- Sound plays (if audio enabled)
- Notification auto-dismisses after 3 seconds

---

### 8. Unread Count Test ✅
**Steps:**
1. Login as User1 in General room
2. Open second window as User2
3. User2 switches to Random room
4. User1 sends message in General
5. Check User2's room list

**Expected:**
- Red badge appears on General room
- Badge shows "1"
- Badge disappears when User2 enters General
- Badge updates in real-time

---

### 9. Message Search Test ✅
**Steps:**
1. Login and send several messages
2. Click 🔍 icon in header
3. Type search query (e.g., "hello")
4. Press Enter or click search

**Expected:**
- Search bar appears below header
- Search results modal opens
- Matching messages display
- Results show sender and timestamp
- Close button works

---

### 10. Load More Messages Test ✅
**Steps:**
1. Send 25+ messages in a room
2. Refresh page
3. Scroll to top of message list
4. Click "Load older messages"

**Expected:**
- Button appears at top when more messages exist
- Clicking loads previous 20 messages
- Scroll position maintained
- Button disappears when no more messages

---

### 11. Read Receipts Test ✅
**Steps:**
1. Login as User1
2. Send a message
3. Open second window as User2
4. User2 views the message

**Expected:**
- User1 sees "✓✓ Read by 1" below their message
- Count updates as more users read
- Only shows on own messages
- Updates in real-time

---

### 12. User Status Test ✅
**Steps:**
1. Login as User1
2. Click status indicator in header
3. Select "Away" (🟡)
4. Check user list

**Expected:**
- Status dropdown appears
- Status changes to Away
- Yellow icon shows in user list
- Other users see status change
- Status persists across rooms

---

### 13. Reconnection Test ✅
**Steps:**
1. Login as User1
2. Stop the server (Ctrl+C)
3. Check connection status
4. Restart server
5. Wait a few seconds

**Expected:**
- Status changes to "Disconnected"
- Socket automatically reconnects
- Status changes back to "Connected"
- Messages can be sent again

---

### 14. Responsive Design Test ✅
**Steps:**
1. Open chat on desktop
2. Resize browser window to mobile size
3. Test all features

**Expected:**
- Layout adapts to screen size
- Room list may hide on mobile
- User list may hide on mobile
- All features remain functional
- Touch interactions work

---

### 15. Private Messaging Test ✅
**Steps:**
1. Login as User1
2. Open second window as User2
3. Use private message feature (if UI implemented)

**Expected:**
- Private messages only visible to sender and recipient
- Messages marked as private
- Other users don't see private messages

---

## Performance Tests

### Load Test
**Steps:**
1. Open 5+ browser windows
2. All users send messages rapidly
3. Monitor performance

**Expected:**
- No lag in message delivery
- UI remains responsive
- No memory leaks
- Server handles load

### File Upload Stress Test
**Steps:**
1. Upload multiple large files (close to 5MB)
2. Upload different file types

**Expected:**
- Files upload successfully
- Size limit enforced (5MB)
- Supported formats work
- Error handling for unsupported files

---

## Bug Testing

### Edge Cases to Test:
- [ ] Empty message submission (should be blocked)
- [ ] Very long messages (500 char limit)
- [ ] Special characters in messages
- [ ] Emoji in messages
- [ ] Multiple rapid room switches
- [ ] Logout and re-login
- [ ] Multiple tabs same user
- [ ] Network interruption
- [ ] Server restart during chat
- [ ] File upload cancellation

---

## Browser Compatibility

Test on:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Checklist Summary

### Core Features
- [ ] User login
- [ ] Real-time messaging
- [ ] Multiple users
- [ ] Room switching
- [ ] User list
- [ ] Connection status

### Advanced Features
- [ ] Typing indicators
- [ ] File uploads
- [ ] Message reactions
- [ ] Notifications (in-app)
- [ ] Browser notifications
- [ ] Sound notifications
- [ ] Unread counts
- [ ] Message search
- [ ] Load more messages
- [ ] Read receipts
- [ ] User status
- [ ] Private messaging
- [ ] System messages
- [ ] Auto-reconnection
- [ ] Responsive design

---

## Known Issues / Limitations

1. **File Storage**: Files stored in memory (lost on server restart)
2. **Message History**: Limited to 100 messages per room
3. **Notification Sound**: Requires user interaction first (browser policy)
4. **Browser Notifications**: Requires permission grant
5. **Mobile Layout**: Some features hidden on small screens

---

## Reporting Issues

If you find bugs:
1. Note the steps to reproduce
2. Check browser console for errors
3. Check server logs
4. Document expected vs actual behavior
5. Include browser/OS information
