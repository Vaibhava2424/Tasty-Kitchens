import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function SignupForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      })

      const data = await response.json()

      if (response.ok) {
        navigate('/login') // after signup redirect to login
      } else {
        setError(data.error || 'Signup failed')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <img src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1752822327/Frame_274_ptqsm2.png" alt="logo" />
          <span className="login-title">Tasty Kitchens</span>
        </div>
        <h2 className="login-heading">Signup</h2>
        <form className="login-form" onSubmit={handleSignup}>
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
            <label className="login-label" htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="login-btn">Signup</button>
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

export default SignupForm
