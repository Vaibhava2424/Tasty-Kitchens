import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.css";
import Header from "../Header";
import { FaStar } from "react-icons/fa";
import Footer from "../Footer";

const DetailedView = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;

  // Initialize cart items from local storage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [otherRestaurants, setOtherRestaurants] = useState([]);

  // Sync cartItems state with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch other restaurants excluding current one
  const fetchOtherRestaurants = async () => {
    try {
      const response = await fetch(
        "https://tasty-kitchen-apis.onrender.com/products"
      );
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      const data = await response.json();
      const filteredRestaurants = data.filter(
        (res) => res.id !== restaurant.id
      );
      setOtherRestaurants(filteredRestaurants);
    } catch (error) {
      console.error("Error fetching other restaurants:", error);
      setOtherRestaurants([]);
    }
  };

  useEffect(() => {
    if (restaurant) {
      fetchOtherRestaurants();
    }
  }, [restaurant]);

  if (!restaurant) {
    return <p>No restaurant data found. Returning to Home page...</p>;
  }

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      newItems[item.id] = { ...item, count: 1 };
      return newItems;
    });

    // ✅ Store restaurantId for back navigation
    localStorage.setItem("restaurantId", restaurant.id);
  };

  const handleIncrement = (item) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [item.id]: {
        ...prevItems[item.id],
        count: prevItems[item.id].count + 1,
      },
    }));
  };

  const handleDecrement = (item) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[item.id].count > 1) {
        newItems[item.id] = {
          ...newItems[item.id],
          count: newItems[item.id].count - 1,
        };
      } else {
        delete newItems[item.id];
      }
      return newItems;
    });
  };

  return (
    <>
      <Header />
      <div className="restaurant-details container">
        <img
          className="restaurant-image"
          src={restaurant.image_url}
          alt={restaurant.name}
        />
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="restaurant-cuisine">{restaurant.cuisine}</p>
          <p className="restaurant-location">{restaurant.location}</p>
          <div>
            <p className="restaurant-rating">
              <FaStar className="star" /> {restaurant.user_rating.rating} / 5
            </p>
          </div>
          <p className="restaurant-reviews">
            {restaurant.user_rating.total_reviews} reviews
          </p>
        </div>
      </div>

      <h1 className="other-foods-title">Other Foods</h1>

      <div className="dishes-list">
        {otherRestaurants.length === 0 ? (
          <p>No other restaurants available.</p>
        ) : (
          otherRestaurants.map((otherRestaurant) => (
            <div key={otherRestaurant.id} className="dish-card">
              <img
                src={otherRestaurant.image_url}
                alt={otherRestaurant.name}
                className="dish-img"
              />
              <div className="dish-info">
                <h4>{otherRestaurant.cuisine}</h4>
                <div className="rating-container">
                  <FaStar className="star" />
                  <span>{otherRestaurant.user_rating.rating}</span>
                </div>
                <p>₹{otherRestaurant.cost_for_two}.00</p>

                {cartItems[otherRestaurant.id] ? (
                  <>
                    <div className="cart-controls">
                      <button
                        onClick={() => handleDecrement(otherRestaurant)}
                        className="decrement-btn"
                      >
                        -
                      </button>
                      <span>{cartItems[otherRestaurant.id].count}</span>
                      <button
                        onClick={() => handleIncrement(otherRestaurant)}
                        className="increment-btn"
                      >
                        +
                      </button>
                    </div>
                    {/* ✅ View Cart Link */}
                    <div className="view-cart-link">
                      <Link to="/cart">View Cart</Link>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleAddToCart(otherRestaurant)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default DetailedView;
