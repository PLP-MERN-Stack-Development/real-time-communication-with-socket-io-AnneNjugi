import { useRef } from 'react'
import './FileUpload.css'

function FileUpload({ onFileSelect }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        onFileSelect({
          fileName: file.name,
          fileData: event.target.result,
          fileType: file.type
        })
      }
      reader.readAsDataURL(file)
    }
    
    // Reset input
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
      <button
        type="button"
        className="file-upload-btn"
        onClick={() => fileInputRef.current?.click()}
        title="Upload file"
      >
        📎
      </button>
    </>
  )
}

export default FileUpload
