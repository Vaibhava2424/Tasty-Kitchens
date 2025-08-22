import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./index.css"
import Header from '../Header'

function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          {
            headers: {
              Authorization: token
            }
          }
        )

        // response contains userId, fetch full user details
        const userId = response.data.userId
        const userResponse = await axios.get(
          `https://tasty-kitchen-apis.onrender.com/all`
        )
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

  if (loading) return <p className="status-message">Loading profile...</p>
  if (error) return <p className="status-message error">{error}</p>
  if (!user) return <p className="status-message">User not found.</p>

  return (
    <>
    <Header/>
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profiles-container">
        <div className="profile-card">
          <div className="avatar">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2>{user.username || 'Unknown User'}</h2>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Password:</strong> {user.password || 'N/A'}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfilePage
