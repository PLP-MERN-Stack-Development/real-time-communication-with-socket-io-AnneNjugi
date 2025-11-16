# Real-Time Chat Application with Socket.io

A fully-featured real-time chat application built with React, Node.js, Express, and Socket.io.

## 🚀 Features

### Core Features
- ✅ Real-time bidirectional communication using Socket.io
- ✅ User authentication (username-based)
- ✅ Global chat room with live messaging
- ✅ Message timestamps and sender information
- ✅ Online/offline user status
- ✅ User list showing all connected users

### Advanced Features
- ✅ **Multiple Chat Rooms** - Switch between General, Random, and Tech Talk rooms
- ✅ **Typing Indicators** - See when other users are typing
- ✅ **File & Image Sharing** - Upload and share files (up to 5MB)
- ✅ **Message Reactions** - React to messages with emojis (👍 ❤️ 😂 😮 😢 🎉)
- ✅ **Real-time Notifications** - In-app and browser notifications for new messages
- ✅ **Sound Notifications** - Audio alerts for incoming messages
- ✅ **Private Messaging** - Send direct messages to specific users
- ✅ **Message Search** - Search through chat history in real-time
- ✅ **Message Pagination** - Load older messages on demand
- ✅ **Read Receipts** - See when your messages have been read
- ✅ **Unread Message Count** - Badge showing unread messages per room
- ✅ **User Status** - Set your status (Online, Away, Busy)
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Auto-reconnection** - Automatically reconnects on connection loss
- ✅ **System Messages** - Notifications when users join or leave

## 📸 Screenshots

![Chat Interface](screenshots/chat-interface.png)
*Main chat interface with multiple rooms and user list*

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Socket.io Client
- Vite (Build tool)
- CSS3 (Custom styling)

**Backend:**
- Node.js
- Express.js
- Socket.io Server
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd real-time-communication-with-socket-io
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Server (.env in server folder):
   ```
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
   
   Client (.env in client folder):
   ```
   VITE_SOCKET_URL=http://localhost:5000
   ```

5. **Start the development servers**
   
   Terminal 1 - Start the server:
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 - Start the client:
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Enter a username to join the chat
   - Open multiple browser windows to test real-time features

## 🎯 Usage

### Joining the Chat
1. Enter your username on the login screen
2. Click "Join Chat" to enter the chat room

### Sending Messages
1. Type your message in the input field at the bottom
2. Press Enter or click "Send" to send the message

### Switching Rooms
1. Click on any room name in the left sidebar
2. Messages are room-specific

### Uploading Files
1. Click the 📎 icon next to the message input
2. Select an image or file (max 5MB)
3. The file will be shared in the current room

### Adding Reactions
1. Hover over any message
2. Click the "+" button
3. Select an emoji to react

### Searching Messages
1. Click the 🔍 icon in the header
2. Type your search query
3. View results in a modal

### Loading Older Messages
1. Scroll to the top of the message list
2. Click "Load older messages" button
3. Previous messages will load

### Changing Status
1. Click your status indicator in the header
2. Select Online, Away, or Busy
3. Other users will see your status

### Viewing Online Users
- Check the right sidebar to see all online users
- Your username is highlighted
- User status icons show their availability

## 🏗️ Project Structure

```
├── client/                    # React frontend
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ChatRoom.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── UserList.jsx
│   │   │   ├── RoomList.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── MessageReactions.jsx
│   │   │   └── Notification.jsx
│   │   ├── socket/           # Socket.io client setup
│   │   │   └── socket.js
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Node.js backend
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔧 Configuration

### Server Configuration
The server runs on port 5000 by default. You can change this in `server/.env`:
```
PORT=5000
```

### Client Configuration
The client connects to the server at `http://localhost:5000`. Update `client/.env` if your server runs on a different port:
```
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Deployment

### Deploy Server (Render/Railway/Heroku)
1. Push your code to GitHub
2. Connect your repository to your hosting service
3. Set environment variables:
   - `PORT` (usually auto-set)
   - `CLIENT_URL` (your deployed client URL)
4. Deploy

### Deploy Client (Vercel/Netlify)
1. Push your code to GitHub
2. Connect your repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variable:
   - `VITE_SOCKET_URL` (your deployed server URL)
6. Deploy

## 🧪 Testing

To test the application:
1. Open multiple browser windows/tabs
2. Login with different usernames
3. Test features:
   - Send messages in different rooms
   - Upload files
   - Add reactions
   - Check typing indicators
   - Verify notifications

## 📝 Features Implemented

- [x] Real-time messaging
- [x] User authentication
- [x] Multiple chat rooms
- [x] Typing indicators
- [x] Online user list
- [x] File/image sharing
- [x] Message reactions
- [x] Browser notifications
- [x] Sound notifications
- [x] System messages
- [x] Auto-reconnection
- [x] Responsive design
- [x] Private messaging support
- [x] Message search
- [x] Message pagination
- [x] Read receipts
- [x] Unread message counts
- [x] User status (Online/Away/Busy)

## 🤝 Contributing

This is a student project for PLP MERN Stack Development course.

## 📄 License

This project is part of an educational assignment.

## 👤 Author

Anne Njugi - PLP MERN Stack Development Student

## 🙏 Acknowledgments

- PLP Academy for the assignment structure
- Socket.io documentation and community
- React and Express.js communities
