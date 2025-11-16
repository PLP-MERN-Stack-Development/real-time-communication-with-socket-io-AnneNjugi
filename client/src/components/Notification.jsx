import { useEffect } from 'react'
import './Notification.css'

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="notification">
      <div className="notification-content">
        <span className="notification-icon">💬</span>
        <span className="notification-text">{message}</span>
      </div>
      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  )
}

export default Notification
