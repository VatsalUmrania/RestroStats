import React from 'react';
import '../styles/default.css'; // Assuming CSS is imported here

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><span className="material-symbols-outlined">location_on</span>123 Restaurant St, Food City</li>
            <li><span className="material-symbols-outlined">call</span>+91 98765 43210</li>
            <li><span className="material-symbols-outlined">mail</span>support@restrostat.com</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/support">Support Center</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook"></a>
            <a href="#" aria-label="Instagram"><span className="material-symbols-outlined">photo_camera</span></a>
            <a href="#" aria-label="Twitter"><span className="material-symbols-outlined">flutter_dash</span></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Restrostat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;