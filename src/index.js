import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';  // Import the main App component
import './index.css';     // Global styles for your app

// Find the root element in your HTML and render the app there
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  {/* Wrap the App in BrowserRouter for routing */}
    <App />
  </BrowserRouter>
);
