import './RoomList.css'

function RoomList({ rooms, currentRoom, onRoomChange }) {
  return (
    <div className="room-list">
      <div className="room-list-header">
        <h3>Rooms</h3>
      </div>
      <div className="room-list-body">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-item ${currentRoom === room.id ? 'active' : ''}`}
            onClick={() => onRoomChange(room.id)}
          >
            <span className="room-icon">#</span>
            <span className="room-name">{room.name}</span>
            {room.unreadCount > 0 && currentRoom !== room.id && (
              <span className="unread-badge">{room.unreadCount}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomList
