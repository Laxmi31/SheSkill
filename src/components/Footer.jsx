import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className="footer-heading">Company</h2>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">About</a></li>
                        <li><a href="#" className="footer-link">Careers</a></li>
                        <li><a href="#" className="footer-link">Brand Center</a></li>
                        <li><a href="#" className="footer-link">Blog</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2 className="footer-heading">Help Center</h2>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">Discord Server</a></li>
                        <li><a href="#" className="footer-link">Twitter</a></li>
                        <li><a href="#" className="footer-link">Facebook</a></li>
                        <li><a href="#" className="footer-link">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2 className="footer-heading">Legal</h2>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">Privacy Policy</a></li>
                        <li><a href="#" className="footer-link">Licensing</a></li>
                        <li><a href="#" className="footer-link">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2 className="footer-heading">Download</h2>
                    <ul className="footer-list">
                        <li><a href="#" className="footer-link">iOS</a></li>
                        <li><a href="#" className="footer-link">Android</a></li>
                        <li><a href="#" className="footer-link">Windows</a></li>
                        <li><a href="#" className="footer-link">MacOS</a></li>
                    </ul>
                </div>
            </div>
           <div className="footer-bottom">
               <span className="footer-bottom-text">© 2023 <a href="#" className="footer-bottom-link">Your Company</a>. All Rights Reserved.</span>
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>

               <div className="footer-social">
                   <a href="https://www.facebook.com" className="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                               <i className="fab fa-facebook-f"></i>
                           </a>
                           <a href="https://discord.com" className="footer-social-link" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                               <i className="fab fa-discord"></i>
                           </a>
                           <a href="https://twitter.com" className="footer-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                               <i className="fab fa-twitter"></i>
                           </a>
               </div>
           </div>
        </footer>
    );
};

export default Footer;
