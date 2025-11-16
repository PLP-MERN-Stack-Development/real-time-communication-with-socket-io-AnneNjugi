import './UserList.css'

function UserList({ users, currentUsername }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'online': return '🟢'
      case 'away': return '🟡'
      case 'busy': return '🔴'
      default: return '●'
    }
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Online Users</h3>
        <span className="user-count">{users.length}</span>
      </div>
      <div className="user-list-body">
        {users.length === 0 ? (
          <p className="no-users">No users online</p>
        ) : (
          users.map((user) => (
            <div 
              key={user.id} 
              className={`user-item ${user.username === currentUsername ? 'current-user' : ''}`}
            >
              <span className={`user-status ${user.status || 'online'}`}>
                {getStatusIcon(user.status)}
              </span>
              <span className="user-name">
                {user.username}
                {user.username === currentUsername && ' (You)'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserList
