// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users, messages, and rooms
const users = {};
const messages = [];
const typingUsers = {};
const rooms = {
  general: { name: 'General', messages: [], unreadCount: {} },
  random: { name: 'Random', messages: [], unreadCount: {} },
  tech: { name: 'Tech Talk', messages: [], unreadCount: {} }
};
const privateMessages = {};
const readReceipts = {}; // messageId -> [userIds who read it]

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = { 
      username, 
      id: socket.id, 
      currentRoom: 'general',
      status: 'online',
      lastSeen: new Date().toISOString()
    };
    socket.join('general');
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    
    // Send room list with unread counts
    const roomList = Object.keys(rooms).map(key => ({
      id: key,
      name: rooms[key].name,
      unreadCount: rooms[key].unreadCount[socket.id] || 0
    }));
    socket.emit('room_list', roomList);
    socket.emit('room_messages', { room: 'general', messages: rooms.general.messages });
    console.log(`${username} joined the chat`);
  });

  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const user = users[socket.id];
    const room = user?.currentRoom || 'general';
    
    const message = {
      ...messageData,
      id: `${Date.now()}-${socket.id}`,
      sender: user?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room,
      reactions: {},
      readBy: [socket.id] // Sender has read it
    };
    
    if (rooms[room]) {
      rooms[room].messages.push(message);
      if (rooms[room].messages.length > 100) {
        rooms[room].messages.shift();
      }
      
      // Increment unread count for users not in this room
      Object.keys(users).forEach(userId => {
        if (userId !== socket.id && users[userId].currentRoom !== room) {
          rooms[room].unreadCount[userId] = (rooms[room].unreadCount[userId] || 0) + 1;
          
          // Send updated room list to that user
          const roomList = Object.keys(rooms).map(key => ({
            id: key,
            name: rooms[key].name,
            unreadCount: rooms[key].unreadCount[userId] || 0
          }));
          io.to(userId).emit('room_list', roomList);
        }
      });
    }
    
    io.to(room).emit('receive_message', message);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      const room = users[socket.id].currentRoom;
      
      if (isTyping) {
        typingUsers[socket.id] = username;
      } else {
        delete typingUsers[socket.id];
      }
      
      io.to(room).emit('typing_users', Object.values(typingUsers));
    }
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      id: `${Date.now()}-${socket.id}`,
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      recipientId: to,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };
    
    // Store private message
    const conversationKey = [socket.id, to].sort().join('-');
    if (!privateMessages[conversationKey]) {
      privateMessages[conversationKey] = [];
    }
    privateMessages[conversationKey].push(messageData);
    
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  // Handle joining a room
  socket.on('join_room', (roomId) => {
    if (users[socket.id]) {
      const oldRoom = users[socket.id].currentRoom;
      
      // Leave old room
      socket.leave(oldRoom);
      
      // Join new room
      socket.join(roomId);
      users[socket.id].currentRoom = roomId;
      
      // Clear unread count for this room
      if (rooms[roomId]) {
        rooms[roomId].unreadCount[socket.id] = 0;
        socket.emit('room_messages', { room: roomId, messages: rooms[roomId].messages });
        
        // Send updated room list with unread counts
        const roomList = Object.keys(rooms).map(key => ({
          id: key,
          name: rooms[key].name,
          unreadCount: rooms[key].unreadCount[socket.id] || 0
        }));
        socket.emit('room_list', roomList);
      }
      
      console.log(`${users[socket.id].username} joined room: ${roomId}`);
    }
  });

  // Handle message reactions
  socket.on('add_reaction', ({ messageId, emoji, room }) => {
    if (rooms[room]) {
      const message = rooms[room].messages.find(m => m.id === messageId);
      if (message) {
        if (!message.reactions[emoji]) {
          message.reactions[emoji] = [];
        }
        if (!message.reactions[emoji].includes(socket.id)) {
          message.reactions[emoji].push(socket.id);
          io.to(room).emit('reaction_added', { messageId, emoji, userId: socket.id, reactions: message.reactions });
        }
      }
    }
  });

  // Handle file upload
  socket.on('send_file', ({ fileName, fileData, fileType, room }) => {
    const user = users[socket.id];
    const currentRoom = room || user?.currentRoom || 'general';
    
    const message = {
      id: `${Date.now()}-${socket.id}`,
      sender: user?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room: currentRoom,
      isFile: true,
      fileName,
      fileData,
      fileType,
      reactions: {},
      readBy: [socket.id]
    };
    
    if (rooms[currentRoom]) {
      rooms[currentRoom].messages.push(message);
      
      // Increment unread count for users not in this room
      Object.keys(users).forEach(userId => {
        if (userId !== socket.id && users[userId].currentRoom !== currentRoom) {
          rooms[currentRoom].unreadCount[userId] = (rooms[currentRoom].unreadCount[userId] || 0) + 1;
        }
      });
    }
    
    io.to(currentRoom).emit('receive_message', message);
  });

  // Handle message read receipt
  socket.on('mark_as_read', ({ messageId, room }) => {
    if (rooms[room]) {
      const message = rooms[room].messages.find(m => m.id === messageId);
      if (message && !message.readBy.includes(socket.id)) {
        message.readBy.push(socket.id);
        io.to(room).emit('message_read', { messageId, userId: socket.id, readBy: message.readBy });
      }
    }
  });

  // Handle user status change
  socket.on('change_status', (status) => {
    if (users[socket.id]) {
      users[socket.id].status = status;
      users[socket.id].lastSeen = new Date().toISOString();
      io.emit('user_list', Object.values(users));
    }
  });

  // Handle search messages
  socket.on('search_messages', ({ query, room }) => {
    if (rooms[room]) {
      const results = rooms[room].messages.filter(msg => 
        msg.message && msg.message.toLowerCase().includes(query.toLowerCase())
      );
      socket.emit('search_results', { results, query });
    }
  });

  // Handle load more messages (pagination)
  socket.on('load_more_messages', ({ room, before }) => {
    if (rooms[room]) {
      const allMessages = rooms[room].messages;
      const beforeIndex = allMessages.findIndex(m => m.id === before);
      
      if (beforeIndex > 0) {
        const start = Math.max(0, beforeIndex - 20);
        const olderMessages = allMessages.slice(start, beforeIndex);
        socket.emit('older_messages', { room, messages: olderMessages, hasMore: start > 0 });
      } else {
        socket.emit('older_messages', { room, messages: [], hasMore: false });
      }
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username, currentRoom } = users[socket.id];
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
      
      // Leave all rooms
      socket.leave(currentRoom);
    }
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    io.emit('user_list', Object.values(users));
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/api/rooms', (req, res) => {
  res.json(Object.keys(rooms).map(key => ({ id: key, name: rooms[key].name })));
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io }; 