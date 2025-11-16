// socket.js - Socket.io client setup

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Custom hook for using socket.io
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [searchResults, setSearchResults] = useState([]);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);

  // Connect to socket server
  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect from socket server
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message
  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  // Send a private message
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing status
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  // Join a room
  const joinRoom = (roomId) => {
    socket.emit('join_room', roomId);
    setCurrentRoom(roomId);
    setMessages([]);
  };

  // Add reaction to message
  const addReaction = (messageId, emoji, room) => {
    socket.emit('add_reaction', { messageId, emoji, room });
  };

  // Send file
  const sendFile = (fileName, fileData, fileType, room) => {
    socket.emit('send_file', { fileName, fileData, fileType, room });
  };

  // Mark message as read
  const markAsRead = (messageId, room) => {
    socket.emit('mark_as_read', { messageId, room });
  };

  // Change user status
  const changeStatus = (status) => {
    socket.emit('change_status', status);
  };

  // Search messages
  const searchMessages = (query, room) => {
    socket.emit('search_messages', { query, room });
  };

  // Load more messages
  const loadMoreMessages = (room, beforeMessageId) => {
    socket.emit('load_more_messages', { room, before: beforeMessageId });
  };

  // Socket event listeners
  useEffect(() => {
    // Connection events
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    // Message events
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    // User events
    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (user) => {
      // You could add a system message here
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const onUserLeft = (user) => {
      // You could add a system message here
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    // Typing events
    const onTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Room events
    const onRoomList = (roomList) => {
      setRooms(roomList);
    };

    const onRoomMessages = ({ room, messages: roomMessages }) => {
      setMessages(roomMessages);
    };

    // Reaction events
    const onReactionAdded = ({ messageId, reactions }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, reactions } : msg
        )
      );
    };

    // Read receipt events
    const onMessageRead = ({ messageId, readBy }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, readBy } : msg
        )
      );
    };

    // Search events
    const onSearchResults = ({ results }) => {
      setSearchResults(results);
    };

    // Pagination events
    const onOlderMessages = ({ messages: olderMessages, hasMore }) => {
      setMessages((prev) => [...olderMessages, ...prev]);
      setHasMoreMessages(hasMore);
    };

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);
    socket.on('room_list', onRoomList);
    socket.on('room_messages', onRoomMessages);
    socket.on('reaction_added', onReactionAdded);
    socket.on('message_read', onMessageRead);
    socket.on('search_results', onSearchResults);
    socket.on('older_messages', onOlderMessages);

    // Clean up event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
      socket.off('room_list', onRoomList);
      socket.off('room_messages', onRoomMessages);
      socket.off('reaction_added', onReactionAdded);
      socket.off('message_read', onMessageRead);
      socket.off('search_results', onSearchResults);
      socket.off('older_messages', onOlderMessages);
    };
  }, []);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    rooms,
    currentRoom,
    searchResults,
    hasMoreMessages,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    joinRoom,
    addReaction,
    sendFile,
    markAsRead,
    changeStatus,
    searchMessages,
    loadMoreMessages,
  };
};

export default socket; 