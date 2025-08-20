import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer'; // Make sure to import the Footer
import './index.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const cartArray = Object.values(cartItems);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrement = (item) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[item.id]) {
        newItems[item.id].count++;
      }
      return newItems;
    });
  };

  const handleDecrement = (item) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[item.id] && newItems[item.id].count > 1) {
        newItems[item.id].count--;
      } else if (newItems[item.id] && newItems[item.id].count === 1) {
        delete newItems[item.id];
      }
      return newItems;
    });
  };

  const handleOrderNowClick = () => {
    navigate('/');
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
      <button type="button" className="order-now-button" onClick={handleOrderNowClick}>
        Order Now
      </button>
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
        <button className="place-order-button">Place Order</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="cart-bg">
        <Header />
        <h2 className="cart-page-title">Your Cart</h2>
        
        {cartArray.length === 0 ? renderEmptyCartView() : renderCartItems()}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
