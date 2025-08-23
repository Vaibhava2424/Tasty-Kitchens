import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./index.css"
import Header from '../Header'
import Footer from '../Footer'

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [feedbackStatus, setFeedbackStatus] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token')
      if (!token) {
        setError('User not logged in')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(
          'https://tasty-kitchen-apis.onrender.com/protected',
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const userId = response.data.userId
        const userResponse = await axios.get('https://tasty-kitchen-apis.onrender.com/all')
        const loggedUser = userResponse.data.find(u => u._id === userId)
        setUser(loggedUser)
      } catch (err) {
        console.error(err.response || err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    if (!feedback.trim()) {
      setFeedbackStatus('Please enter your feedback.')
      return
    }
    try {
      const token = Cookies.get('token')
      await axios.post(
        'https://tasty-kitchen-apis.onrender.com/feedback',
        { username: user.username, message: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setFeedback('')
      setFeedbackStatus('Submitted successfully! Thank you for your feedback 😀.')
    } catch (err) {
      console.error(err)
      setFeedbackStatus('Failed to submit feedback.')
    }
  }

  if (loading) return <p className="status-message">Loading profile...</p>
  if (error) return <p className="status-message error">{error}</p>
  if (!user) return <p className="status-message">User not found.</p>

  return (
    <>
      <Header />
      <div className="profile-page">
        <h1>My Profile</h1>

        <div className="profiles-container">
          <div className="profile-card">
            <div className="avatar">{user.username ? user.username.charAt(0).toUpperCase() : 'U'}</div>
            <h2>{user.username || 'Unknown User'}</h2>
            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            <p><strong>Password:</strong> {user.password || 'N/A'}</p>
          </div>
        </div>

        {/* ===================== Feedback Form ===================== */}
        <div className="feedback-container">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please write your feedback about the project here..."
              rows="4"
            ></textarea>
            <button type="submit">Submit</button>

            {feedbackStatus && (
              <p className={`feedback-status ${
                feedbackStatus.toLowerCase().includes('failed') || feedbackStatus.toLowerCase().includes('please') 
                  ? 'error' 
                  : 'success'
              }`}>
                {feedbackStatus}
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage
