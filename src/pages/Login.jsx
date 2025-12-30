import { useState } from 'react'
import { buildApiUrl } from '../utils/api'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setResponse('Error: Please enter both username and password')
      return
    }

    setLoading(true)
    setResponse('Sending login request...')

    try {
      const res = await fetch(buildApiUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })

      const contentType = res.headers.get('content-type')
      let data

      if (contentType && contentType.includes('application/json')) {
        data = await res.json()
        setResponse(JSON.stringify(data, null, 2))
      } else {
        data = await res.text()
        setResponse(data)
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {response && (
        <div className="response-box">
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  )
}

export default Login
