import { useState, useRef } from 'react'
import FileUpload from './FileUpload'
import './MessageInput.css'

function MessageInput({ onSendMessage, onTyping, onFileUpload }) {
  const [message, setMessage] = useState('')
  const typingTimeoutRef = useRef(null)

  const handleChange = (e) => {
    setMessage(e.target.value)
    
    // Notify typing
    onTyping(true)
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Stop typing after 1 second of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false)
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
      onTyping(false)
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <FileUpload onFileSelect={onFileUpload} />
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        maxLength={500}
      />
      <button type="submit" disabled={!message.trim()}>
        Send
      </button>
    </form>
  )
}

export default MessageInput
