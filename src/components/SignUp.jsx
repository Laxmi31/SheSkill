import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateMobile = (mobile) => {
        return /^\d{10}$/.test(mobile);  // Ensures exactly 10 digits
    };

    async function handleSubmit(e) {
        e.preventDefault();

        // Clear previous messages
        setErrorMessage('');
        setSuccessMessage('');

        if (!validateEmail(emailId)) {
            setErrorMessage('Invalid email format.');
            return;
        }

        if (!validateMobile(mobile)) {
            setErrorMessage('Mobile number must be exactly 10 digits.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, gender, age, mobile, emailId, password }),
            });

            if (response.ok) {
                // Parse JSON response only if content type is correct
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setSuccessMessage(data.message || "Signup successful!");
                    setTimeout(() => navigate('/login'), 2000);  // Redirect after 2 seconds
                } else {
                    setErrorMessage('Unexpected response format from server.');
                }
            } else {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setErrorMessage(`Error: ${data.message || 'Signup failed!'}`);
                } else {
                    setErrorMessage('Failed to sign up. Please try again later.');
                }
            }
        } catch (error) {
            setErrorMessage('There was a problem with the fetch operation.');
            console.error('Fetch error:', error.message);
        }
    }

    return (
        <div className="signup-container">
            <div className="left-section">
                <img src="images/girl7.png" alt="Signup Illustration" />
            </div>
            <div className="right-section">
                <div className="container-signup">
                    <div className="signup-box">
                        <h2>Sign up</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Full Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    placeholder="Age"
                                    required
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    placeholder="Phone Number"
                                    required
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="emailId"
                                    name="emailId"
                                    placeholder="Personal Email"
                                    required
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Set Your Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>
                        <div className="already-account">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
