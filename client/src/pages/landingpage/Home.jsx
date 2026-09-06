import "./home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Smart Waste Management for a Cleaner Tomorrow</h1>

          <p>
            EcoBins is an IoT-powered Smart Garbage Monitoring System that
            enables municipalities to monitor bin levels, optimize collection
            routes, reduce operational costs, and keep cities cleaner through
            real-time data.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/hero-bin.png"
            alt="EcoBins Smart Waste Management"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="working" className="working">
        <h2>How EcoBins Works</h2>

        <div className="steps">

          <div className="step-card">
            <h1>📡</h1>
            <h3>Monitor</h3>
            <p>
              Smart sensors continuously measure garbage levels and harmful
              gases.
            </p>
          </div>

          <div className="step-card">
            <h1>☁️</h1>
            <h3>Upload</h3>
            <p>
              Sensor data is securely transmitted to the cloud in real time.
            </p>
          </div>

          <div className="step-card">
            <h1>🧠</h1>
            <h3>Analyze</h3>
            <p>
              The dashboard identifies full bins and generates optimized
              collection schedules.
            </p>
          </div>

          <div className="step-card">
            <h1>🚛</h1>
            <h3>Collect</h3>
            <p>
              Collection teams receive optimized routes, reducing travel time
              and fuel consumption.
            </p>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;