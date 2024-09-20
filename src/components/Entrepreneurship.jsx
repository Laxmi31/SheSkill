import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './services/AuthContext';
import './Entrepreneurship.css';

function Entrepreneurship() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoggedIn, user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

const fetchIdeas= async () => {
        try {
            const response = await fetch('http://localhost:8080/idea/allIdeas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setIdeas(data);


        } catch (error) {
            console('Failed to fetch jobs');
        }
    };


useEffect(()=>{

const fetchIdeas= async () => {
        try {
            const response = await fetch('http://localhost:8080/idea/allIdeas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setIdeas(data);


        } catch (error) {
            console('Failed to fetch jobs');
        }
    };




    fetchIdeas()

    },[])
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const addIdea = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/idea/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure the token is valid
        },
        body: JSON.stringify({
          title,
          type,
          description,
          link,
         // Automatically setting posted_by from logged-in user
        }),
      });

      if (response.ok) {
        setSuccessMessage('Idea submitted successfully!');
        setErrorMessage('');
        setTitle('');
        setType('');
        setDescription('');
        setLink('');
        await fetchIdeas();

      } else if (response.status === 401) {
        setErrorMessage('Unauthorized access. Please log in again.');
        setSuccessMessage('');
      } else {
        setErrorMessage('There was a problem with the submission.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Submission error: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="entrepreneurship-wrapper">
      <div className="image-container">
        <img src="images/group1.png" alt="Entrepreneurship Illustration" />
      </div>
      <div className="entrepreneurship-container">
        <form className="idea-form" onSubmit={addIdea}>
          <h2>Share Your Innovative Idea</h2>
          <input
            type="text"
            placeholder="Title of your idea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type of your idea"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <textarea
            placeholder="Describe your idea..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link related to your idea (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button type="submit">Submit Idea</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

        <div className="idea-list">
          <h3>Submitted Ideas</h3>
          {ideas.map((idea, index) => (
            <div key={index} className="idea-item">
              <h4>{idea.title}</h4>
              <p>Type: {idea.type}</p>
              <p>{idea.description}</p>
              <a href={idea.link} target="_blank" rel="noopener noreferrer">
                {idea.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Entrepreneurship;
