// src/index.js or src/App.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Adjust the path as necessary
import { UserProvider } from './context/UserContext'; // Adjust the path as necessary
import './index.css'; // Ensure this path is correct

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);
