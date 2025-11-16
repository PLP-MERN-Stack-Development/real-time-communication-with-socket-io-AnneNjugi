import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch, onClose }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    onClose()
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search messages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit" disabled={!query.trim()}>
          🔍
        </button>
        <button type="button" onClick={handleClear} className="close-btn">
          ✕
        </button>
      </form>
    </div>
  )
}

export default SearchBar
