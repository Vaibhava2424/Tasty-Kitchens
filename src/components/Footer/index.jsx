import React from "react";
import { FaPinterestP, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import './index.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h2>
          🍴 <span>Tasty Kitchens</span>
        </h2>
      </div>
      <div className="footer-text">
        <p>
          The only thing we are serious about is food. <br />
          Contact us on
        </p>
      </div>
      <div className="social-icons">
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
          <FaPinterestP />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
