import "./Home.css";
import { Link } from "react-router-dom";
import Com from "./reports/complain";
import Map from "../map/usermap";
import Req from "./reports/binrequest";
import {
  FaTrash,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaTruck,
  FaBell,
  FaArrowRight,

} from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🌱 EcoBins</div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#forms">Requests</a>
          </li>
          <li>
            <a href="#forms">Complaints</a>
          </li>
          <li>
            <a href="#map">Nearby Bins</a>
          </li>
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
        </ul>

        <button className="profile-btn">Profile</button>
        <Link  to="/" className="profile-btn">
          LogOut
        </Link>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-left">
          <h1>
            Smart Garbage
            <span> Monitoring System</span>
          </h1>

          <p>
            Smart waste management made easy. Report issues, request collection,
            and find nearby smart bins for a cleaner, greener city.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() =>
                document.getElementById("forms").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Request Collection
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document.getElementById("forms").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Report Complaint
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">♻️ Keep Your City Clean</div>
        </div>
      </section>

      {/* Quick Services */}
      <section id="services" className="services">
        <div className="service-card">
          <FaTruck className="icon" />
          <h3>Quick Collection</h3>
          <p>Request immediate garbage pickup.</p>
        </div>

        <div className="service-card">
          <FaExclamationTriangle className="icon" />
          <h3>Complaint</h3>
          <p>Report damaged or overflowing bins.</p>
        </div>

        <div className="service-card">
          <FaMapMarkerAlt className="icon" />
          <h3>Nearby Bins</h3>
          <p>Find the nearest smart dustbin.</p>
        </div>

        <div className="service-card">
          <FaBell className="icon" />
          <h3>Notifications</h3>
          <p>Track all your requests.</p>
        </div>
      </section>

      {/* Complaint + Request */}

      <section id="forms" className="forms">
        {/* Complaint */}
        <Com />

        

        {/* Request */}
        <Req />

      </section>

      {/* Nearby */}

      <section id="map" className="nearby">
        <div className="nearby-card">
          <h2>
            <FaMapMarkerAlt />
            Nearby Smart Bin
          </h2>
          <div className="map">
            <Map />
          </div>

          {/** add navigaet to nearest bin */}

          <button
            onClick={() =>
              document.getElementById("map").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Find Nearest Bin
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Dashboard */}

      <section id="dashboard" className="dashboard">
        <div className="dash-card">
          <FaTrash className="dash-icon" />

          <h3>25</h3>

          <p>Total Requests</p>
        </div>

        <div className="dash-card">
          <FaTruck className="dash-icon" />

          <h3>10</h3>

          <p>Completed</p>
        </div>

        <div className="dash-card">
          <FaBell className="dash-icon" />

          <h3>4</h3>

          <p>Pending</p>
        </div>

        <div className="dash-card">
          <FaExclamationTriangle className="dash-icon" />

          <h3>2</h3>

          <p>Complaints</p>
        </div>
      </section>

      <footer>© 2026 EcoBins | Smart Garbage Monitoring System</footer>
    </div>
  );
}

export default Home;
