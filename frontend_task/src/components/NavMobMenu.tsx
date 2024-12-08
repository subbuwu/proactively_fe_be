import  { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  return (
    <div className="mobile-menu-container">
      <button 
        className="menu-toggle-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <></> : <Menu size={24} />}
      </button>

      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
            <button 
            className="menu-toggle-btn"
            style={{marginLeft:'auto'}}
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
          <div className="login-section">
            <div className="login-group">
              <h2>Doctor</h2>
              <div className="login-buttons">
                <a href="#" className="login-link">Login</a>
                <a href="#" className="signup-link">Sign up</a>
              </div>
            </div>
            
            <div className="login-group">
              <h2>Patients</h2>
              <div className="login-buttons">
                <a href="#" className="login-link">Login</a>
                <a href="#" className="signup-link">Sign up</a>
              </div>
            </div>
          </div>

          <nav className="mobile-nav">
            <a href="#" className="nav-item">
              Doctors
              <span className="arrow">→</span>
            </a>
            <a href="#" className="nav-item">
              List your practice
              <span className="arrow">→</span>
            </a>
            <a href="#" className="nav-item">
              For Employers
              <span className="arrow">→</span>
            </a>
            <a href="#" className="nav-item">
              Courses
              <span className="arrow">→</span>
            </a>
            <a href="#" className="nav-item">
              Books
              <span className="arrow">→</span>
            </a>
            <a href="#" className="nav-item">
              Speakers
              <span className="arrow">→</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;