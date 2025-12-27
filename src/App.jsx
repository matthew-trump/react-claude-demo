import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!question.trim()) {
      setResponse('Error: Please enter a question')
      return
    }

    setLoading(true)
    setResponse('Sending request...')

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data.answer || JSON.stringify(data))
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>LLM Question Interface</h1>

      <div className="question-section">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          rows={5}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Submit Question'}
        </button>
      </div>

      <div className="response-section">
        <h2>Response:</h2>
        <p>{response || 'Your response will appear here...'}</p>
      </div>
    </div>
  )
}

export default App
