import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = () => {
    setResponse('OK')
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

        <button onClick={handleSubmit}>
          Submit Question
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
