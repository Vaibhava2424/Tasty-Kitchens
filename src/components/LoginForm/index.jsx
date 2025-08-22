import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    // Trim spaces before sending
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    try {
      const response = await fetch('https://tasty-kitchen-apis.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        Cookies.set('token', data.token)
        console.log('Login successful:', data)
        navigate('/', { replace: true }) // redirect to home after login
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Try again.')
    }
  }

  const goToSignup = () => {
    navigate('/signup') // redirect to signup page
  }

  const token = Cookies.get('token')
  if (token) {
    return <Navigate to="/" /> // redirect if token exists
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <img 
            src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1752822327/Frame_274_ptqsm2.png" 
            alt="logo" 
          />
          <span className="login-title">Tasty Kitchens</span>
        </div>
        <h2 className="login-heading">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label className="login-label" htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="login-label" htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <div className="login-buttons">
            <button type="submit" className="login-btn">Login</button>
            <p className="OR-css"></p>
            <button 
              type="button" 
              className="login-btn" 
              onClick={goToSignup}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1752821762/ceff20e8367d1981f2a409a617ac848670d29c7e_dc9fjx.jpg"
          alt="Tasty Kitchens"
          className="login-image"
        />
      </div>
    </div>
  )
}

export default LoginForm
