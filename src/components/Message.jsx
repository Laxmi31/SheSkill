import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './services/AuthContext'; // Context for logged-in user
import './Message.css';

const Message = () => {
  const { isLoggedIn, user } = useContext(AuthContext); // Fetch logged-in user's info
  const [Phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // State to show error messages
  const [success, setSuccess] = useState(''); // State to show success message

  // Redirect to login if user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="header">
        <a href="mailto:sheskillportal@gmail.com" className="email-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#64ffda" className="icon">
            <path d="M2 3h20v18H2z" />
          </svg>
          <span>sheskillportal@gmail.com</span>
        </a>
      </div>

      <div className="form-container">
        <h2 className="form-title">Write me a Message <span role="img" aria-label="pointing down">👇</span></h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Success message */}
        <form className="form" >
          <input
            type="phone"
            placeholder="Mobile number"
            className="input"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <a href={`https://wa.me/${Phone}/?text=${message || ""}`} target="_blank" class="submit-button">
            Send
          </a>
        </form>
      </div>
    </div>
  );
};

export default Message;
