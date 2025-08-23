import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer'; 
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartArray = Object.values(cartItems);

  // ✅ Get restaurantId from localStorage

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);



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

  const handlePlaceOrder = () => {
    setCartItems({});
    localStorage.removeItem('cart');
    setOrderPlaced(true);
  };

  const handleGoBack = () => {
    
      navigate('/'); // fallback to home
  };

  const orderTotal = cartArray.reduce((total, item) => {
    return total + item.cost_for_two * item.count;
  }, 0);

  const renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1755702794/cooking_1_uzz2um.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link className="go-home-button" to="/">Order Now</Link>
    </div>
  );

  const renderCartItems = () => (
    <div className="cart-items-container">
      <div className="cart-header">
        <span className="item">Item</span>
        <span className="quantity">Quantity</span>
        <span className="price">Price</span>
      </div>
      
      {cartArray.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <img src={item.image_url} alt={item.name} className="cart-img" />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>₹ {item.cost_for_two}.00</p>
            </div>
          </div>
          <div className="cart-quantity-controls">
            <button onClick={() => handleDecrement(item)}>-</button>
            <span>{item.count}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>
          <span className="cart-item-price">₹ {item.cost_for_two * item.count}.00</span>
        </div>
      ))}
      
      <div className="order-total-container">
        <h3>Order Total:</h3>
        <span className="order-total-amount">₹ {orderTotal.toFixed(2)}</span>
      </div>
      <div className="place-order-container">
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      {/* ✅ Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          ⬅ Back To Home
        </button>
      </div>
    </div>
  );

  const renderPaymentSuccess = () => (
    <div className="payment-success-container">
      <div className="success-icon">
        <img src = "https://res.cloudinary.com/dodfv5sbg/image/upload/v1755749620/check-circle.1_1_dylsby.svg"/>
      </div>
      <h2>Payment Successful</h2>
      <p>Thank you for ordering</p>
      <p>Your payment is successfully completed.</p>
      <Link className="go-home-button" to="/">Go To Home Page</Link>
    </div>
  );

  return (
    <>
     <Header />
      <div className="cart-bg">
        {orderPlaced 
          ? renderPaymentSuccess() 
          : (cartArray.length === 0 ? renderEmptyCartView() : renderCartItems())}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
