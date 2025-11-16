import { useState } from 'react'
import './MessageReactions.css'

const EMOJI_OPTIONS = ['👍', '❤️', '😂', '😮', '😢', '🎉']

function MessageReactions({ messageId, reactions, onAddReaction, currentRoom }) {
  const [showPicker, setShowPicker] = useState(false)

  const handleEmojiClick = (emoji) => {
    onAddReaction(messageId, emoji, currentRoom)
    setShowPicker(false)
  }

  return (
    <div className="message-reactions">
      <div className="reactions-display">
        {Object.entries(reactions || {}).map(([emoji, users]) => (
          users.length > 0 && (
            <span key={emoji} className="reaction-badge">
              {emoji} {users.length}
            </span>
          )
        ))}
      </div>
      
      <div className="reaction-picker-container">
        <button
          className="add-reaction-btn"
          onClick={() => setShowPicker(!showPicker)}
        >
          +
        </button>
        
        {showPicker && (
          <div className="emoji-picker">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                className="emoji-option"
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageReactions
