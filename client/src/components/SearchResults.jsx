import './SearchResults.css'

function SearchResults({ results, onClose }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="search-results-overlay">
      <div className="search-results-modal">
        <div className="search-results-header">
          <h3>Search Results ({results.length})</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        <div className="search-results-body">
          {results.length === 0 ? (
            <p className="no-results">No messages found</p>
          ) : (
            results.map((msg) => (
              <div key={msg.id} className="search-result-item">
                <div className="result-header">
                  <span className="result-sender">{msg.sender}</span>
                  <span className="result-time">{formatTime(msg.timestamp)}</span>
                </div>
                <div className="result-content">{msg.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
