import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="home-navbar">

      <div className="home-logo">
        🌱 EcoBins
      </div>

      <ul className="home-nav-links">

        <li><a href="#home">Home</a></li>

        <li><a href="#working">How It Works</a></li>

        <li><a href="#features">Features</a></li>

        <li><a href="#about">About</a></li>

        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="home-buttons">

        <Link to="/user" className="login-btn">
          user
        </Link>

        <Link to="/admin" className="signup-btn">
          admin
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;