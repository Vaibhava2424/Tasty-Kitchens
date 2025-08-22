import React, { useEffect, useState } from 'react'
import './index.css'
import { FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import { FaStar } from 'react-icons/fa'
import Cookies from 'js-cookie'
import Footer from '../Footer'

function Home() {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [restaurants, setRestaurants] = useState([])
  const [offset, setOffset] = useState(0)
  const [sortBy, setSortBy] = useState('lowest')
  const [totalRestaurants, setTotalRestaurants] = useState(30); // Use 30 from your data
  const LIMIT = 9

  // Check for token on component load
  useEffect(() => {
    const jwtToken = Cookies.get('token')
    if (!jwtToken) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  // Fetch Offers for Carousel
  const fetchOffers = async () => {
    try {
      const response = await fetch('https://tasty-kitchen-apis.onrender.com/offers')
      if (!response.ok) throw new Error('Failed to fetch offers')
      const data = await response.json()
      setOffers(data)
    } catch (error) {
      console.error('Error fetching offers:', error)
      setOffers([])
    }
  }

  // Fetch Restaurant List with sorting and pagination
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`https://tasty-kitchen-apis.onrender.com/products`)
      if (!response.ok) throw new Error('Failed to fetch restaurants')
      const data = await response.json()
      
      // Frontend sorting logic
      let sortedData = [...data]
      if (sortBy === 'highest') {
        sortedData.sort((a, b) => b.user_rating.rating - a.user_rating.rating)
      } else {
        sortedData.sort((a, b) => a.user_rating.rating - b.user_rating.rating)
      }
      
      // Frontend pagination logic
      const paginatedData = sortedData.slice(offset, offset + LIMIT)
      setRestaurants(paginatedData)
      setTotalRestaurants(sortedData.length)
    } catch (error) {
      console.error('Error fetching restaurants:', error)
      setRestaurants([])
    }
  }

  // Effect to fetch offers on component mount
  useEffect(() => {
    fetchOffers()
  }, [])

  // Effect for carousel auto-scroll
  useEffect(() => {
    if (offers.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [offers, currentIndex])

  // Effect to fetch and sort restaurants based on user changes
  useEffect(() => {
    fetchRestaurants()
  }, [offset, sortBy])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length)
  }

  // Pagination logic
  const totalPages = Math.ceil(totalRestaurants / LIMIT)
  const currentPage = Math.floor(offset / LIMIT) + 1

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setOffset(0) // Reset to first page on sort change
  }

  return (
    <div>
      <Header />

      {/* Carousel Section */}
      <div className="carousel-container">
        {offers.length > 0 ? (
          <div className="carousel-wrapper">
            <button className="carousel-arrow left" onClick={handlePrev} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <img
              src={offers[currentIndex].image_url}
              alt={`Offer ${currentIndex + 1}`}
              className="carousel-image"
            />
            <button className="carousel-arrow right" onClick={handleNext} aria-label="Next">
              <FaChevronRight />
            </button>
            <div className="carousel-dots">
              {offers.map((_, idx) => (
                <span
                  key={idx}
                  className={`carousel-dot${idx === currentIndex ? ' active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="carousel-loading-text">Loading offers...</p>
        )}
      </div>

      {/* Restaurants Header Section */}
      <div className="restaurants-header">
        <div className="header-left">
          <h1 className="header-title">Popular Restaurants</h1>
          <p className="header-description">
            Select Your favourite restaurant special dish and make your day happy...
          </p>
        </div>
        <div className="header-right-filter">
          <FaFilter className="filter-icon" />
          <select className="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="lowest">Sort by Lowest</option>
            <option value="highest">Sort by Highest</option>
          </select>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-card"
              onClick={() =>
                navigate(`/detailed-view/${restaurant.id}`, {
                  state: { restaurant },
                })
              }
              style={{ cursor: 'pointer' }}
            >
              <img src={restaurant.image_url} alt={restaurant.name} className="restaurant-img" />
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisine}</p>
                <div className="restaurant-rating">
                  <FaStar className="star" />
                  <span className="rating">{restaurant.user_rating.rating}</span>
                  <span className="count">
                    ({restaurant.user_rating.total_reviews} ratings)
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading restaurants...</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          onClick={() => setOffset((prev) => Math.max(prev - LIMIT, 0))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="pagination-page">
          <span className="current_page_css">{currentPage}</span> <span className="of_css">of</span> <span className="current_page_css">{totalPages}</span>
        </span>
        <button
          onClick={() => setOffset((prev) => prev + LIMIT)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Home