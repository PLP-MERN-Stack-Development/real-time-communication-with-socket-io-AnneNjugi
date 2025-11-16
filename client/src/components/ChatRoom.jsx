import { useEffect, useState } from 'react'
import { useSocket } from '../socket/socket'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import UserList from './UserList'
import RoomList from './RoomList'
import Notification from './Notification'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import StatusSelector from './StatusSelector'
import './ChatRoom.css'

function ChatRoom({ username, onLogout }) {
  const {
    isConnected,
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
    setTyping,
    joinRoom,
    addReaction,
    sendFile,
    markAsRead,
    changeStatus,
    searchMessages,
    loadMoreMessages,
    lastMessage
  } = useSocket()

  const [notification, setNotification] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [userStatus, setUserStatus] = useState('online')

  useEffect(() => {
    connect(username)
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    
    return () => disconnect()
  }, [username])

  // Show notification for new messages
  useEffect(() => {
    if (lastMessage && !lastMessage.system && lastMessage.sender !== username) {
      // In-app notification
      setNotification(`${lastMessage.sender}: ${lastMessage.message || 'Sent a file'}`)
      
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Message', {
          body: `${lastMessage.sender}: ${lastMessage.message || 'Sent a file'}`,
          icon: '/chat-icon.png'
        })
      }
      
      // Play sound
      const audio = new Audio('/notification.mp3')
      audio.play().catch(() => {}) // Ignore errors if sound fails
    }
  }, [lastMessage, username])

  // Mark messages as read when viewing them
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1]
      if (lastMsg && !lastMsg.system && lastMsg.sender !== username) {
        markAsRead(lastMsg.id, currentRoom)
      }
    }
  }, [messages, currentRoom, username])

  const handleSendMessage = (message) => {
    sendMessage(message)
  }

  const handleTyping = (isTyping) => {
    setTyping(isTyping)
  }

  const handleRoomChange = (roomId) => {
    joinRoom(roomId)
    setShowSearch(false)
  }

  const handleFileUpload = (fileData) => {
    sendFile(fileData.fileName, fileData.fileData, fileData.fileType, currentRoom)
  }

  const handleSearch = (query) => {
    searchMessages(query, currentRoom)
    setShowSearchResults(true)
  }

  const handleLoadMore = () => {
    if (messages.length > 0 && hasMoreMessages) {
      loadMoreMessages(currentRoom, messages[0].id)
    }
  }

  const handleStatusChange = (status) => {
    setUserStatus(status)
    changeStatus(status)
  }

  return (
    <div className="chat-room">
      <div className="chat-header">
        <div className="header-left">
          <h2>Real-Time Chat</h2>
          <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '● Connected' : '○ Disconnected'}
          </span>
        </div>
        <div className="header-right">
          <button 
            className="search-toggle-btn"
            onClick={() => setShowSearch(!showSearch)}
            title="Search messages"
          >
            🔍
          </button>
          <StatusSelector 
            currentStatus={userStatus}
            onStatusChange={handleStatusChange}
          />
          <span className="username">👤 {username}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="chat-body">
        <RoomList 
          rooms={rooms} 
          currentRoom={currentRoom}
          onRoomChange={handleRoomChange}
        />
        <div className="chat-main">
          {showSearch && (
            <SearchBar 
              onSearch={handleSearch}
              onClose={() => setShowSearch(false)}
            />
          )}
          <MessageList 
            messages={messages} 
            currentUsername={username}
            typingUsers={typingUsers}
            onAddReaction={addReaction}
            currentRoom={currentRoom}
            hasMoreMessages={hasMoreMessages}
            onLoadMore={handleLoadMore}
          />
          <MessageInput 
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            onFileUpload={handleFileUpload}
          />
        </div>
        <UserList users={users} currentUsername={username} />
      </div>

      {notification && (
        <Notification 
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}

      {showSearchResults && (
        <SearchResults 
          results={searchResults}
          onClose={() => setShowSearchResults(false)}
        />
      )}
    </div>
  )
}

export default ChatRoom
