import { useEffect, useRef } from 'react'
import MessageReactions from './MessageReactions'
import './MessageList.css'

function MessageList({ messages, currentUsername, typingUsers, onAddReaction, currentRoom, hasMoreMessages, onLoadMore }) {
  const messagesEndRef = useRef(null)
  const messagesStartRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const renderFileMessage = (msg) => {
    const isImage = msg.fileType?.startsWith('image/')
    
    return (
      <div className="file-message">
        {isImage ? (
          <img 
            src={msg.fileData} 
            alt={msg.fileName}
            className="file-image"
          />
        ) : (
          <a 
            href={msg.fileData} 
            download={msg.fileName}
            className="file-download"
          >
            📎 {msg.fileName}
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="message-list">
      {hasMoreMessages && messages.length > 0 && (
        <button className="load-more-btn" onClick={onLoadMore}>
          Load older messages
        </button>
      )}
      
      <div ref={messagesStartRef} />
      
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.system 
                ? 'system-message' 
                : msg.sender === currentUsername 
                ? 'own-message' 
                : 'other-message'
            }`}
          >
            {msg.system ? (
              <p className="system-text">{msg.message}</p>
            ) : (
              <>
                <div className="message-header">
                  <span className="sender">{msg.sender}</span>
                  <span className="timestamp">{formatTime(msg.timestamp)}</span>
                </div>
                {msg.isFile ? (
                  renderFileMessage(msg)
                ) : (
                  <div className="message-content">{msg.message}</div>
                )}
                {!msg.system && (
                  <>
                    <MessageReactions
                      messageId={msg.id}
                      reactions={msg.reactions}
                      onAddReaction={onAddReaction}
                      currentRoom={currentRoom}
                    />
                    {msg.sender === currentUsername && msg.readBy && msg.readBy.length > 1 && (
                      <div className="read-receipt">
                        ✓✓ Read by {msg.readBy.length - 1}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))
      )}
      
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <span>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
