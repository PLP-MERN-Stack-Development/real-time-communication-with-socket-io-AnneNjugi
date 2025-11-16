import { useState } from 'react'
import './StatusSelector.css'

const STATUS_OPTIONS = [
  { value: 'online', label: 'Online', icon: '🟢' },
  { value: 'away', label: 'Away', icon: '🟡' },
  { value: 'busy', label: 'Busy', icon: '🔴' }
]

function StatusSelector({ currentStatus, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleStatusClick = (status) => {
    onStatusChange(status)
    setIsOpen(false)
  }

  const currentStatusObj = STATUS_OPTIONS.find(s => s.value === currentStatus) || STATUS_OPTIONS[0]

  return (
    <div className="status-selector">
      <button 
        className="status-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="status-icon">{currentStatusObj.icon}</span>
        <span className="status-label">{currentStatusObj.label}</span>
      </button>
      
      {isOpen && (
        <div className="status-dropdown">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              className={`status-option ${currentStatus === status.value ? 'active' : ''}`}
              onClick={() => handleStatusClick(status.value)}
            >
              <span className="status-icon">{status.icon}</span>
              <span className="status-label">{status.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default StatusSelector
