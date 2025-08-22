// NotFound.js
import React from 'react';

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-not-found-lg-output-v0.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
    </p>
    <p className="not-found-description">
      Please go back to the homepage
    </p>
    <button
      type="button"
      className="home-button"
      onClick={() => window.location.href = '/'}
    >
      Home Page
    </button>
  </div>
);

export default NotFound;