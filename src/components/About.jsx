import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
                <p>Welcome to our platform! Discover who we are and what we stand for.</p>
            </div>
            <div className="about-content">
                <div className="about-image">
                    <img src="images/About1.jpg" alt="About Us" />
                </div>
                <div className="about-text">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to empower individuals and create opportunities for career growth.
                        We believe in providing the best resources and support to help you achieve your goals.
                    </p>
                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where everyone has access to career resources and opportunities.
                        Our platform is designed to connect talent with companies and foster professional growth.
                    </p>
                </div>
            </div>
            <div className="about-footer">
                <h2>Get in Touch</h2>
                <p>If you have any questions or need support, feel free to reach out to us.</p>
                <a href="mailto:jebo22mca@cmrit.ac.in" className="contact-email">Contact Us: sheskilljobportal@gmail.com</a><br/>

            </div>
        </div>
    );
};

export default About;
