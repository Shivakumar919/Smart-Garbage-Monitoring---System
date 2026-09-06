import "./Home.css";
import Navbar from "./Navbar";

function AdminHome() {
  return (
    <>
      <Navbar />

      <main className="admin-home">

        {/* Header */}
        <section className="welcome">
          <div>
            <small>ADMIN DASHBOARD</small>
            <h1>EcoBins Admin Dashboard</h1>
            <p>
              Monitor smart bins, manage requests and improve waste collection.
            </p>
          </div>

          <div className="admin-user">
            👤 <span>Admin</span>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <span>🗑️</span>
            <div>
              <p>Total Smart Bins</p>
              <h2>150</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>🚨</span>
            <div>
              <p>Full Bins</p>
              <h2>18</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>📦</span>
            <div>
              <p>Pending Requests</p>
              <h2>12</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>⚠️</span>
            <div>
              <p>Complaints</p>
              <h2>7</h2>
            </div>
          </div>

        </section>

        {/* Main */}
        <section className="main-grid">

          <div className="panel">
            <h2>🚨 High Priority Bins</h2>

            <div className="list">
              <p>🔴 Bin 101 - LB Nagar <b>98%</b></p>
              <p>🔴 Bin 205 - Meerpet <b>96%</b></p>
              <p>🔴 Bin 117 - Nagole <b>95%</b></p>
              <p>🟠 Bin 321 - Dilsukhnagar <b>91%</b></p>
            </div>
          </div>

          <div className="panel">
            <h2>Quick Actions</h2>

            <button>📍 Navigation Map</button>
            <button>🗑️ View Smart Bins</button>
            <button>📦 Collection Requests</button>
            <button>⚠️ View Complaints</button>
          </div>

        </section>

        {/* Area Status */}
        <section className="panel">
          <h2>Area Wise Bin Status</h2>

          <div className="areas">

            <div>
              <b>📍 LB Nagar</b>
              <span>30 Bins · 8 Full</span>
            </div>

            <div>
              <b>📍 Meerpet</b>
              <span>22 Bins · 5 Full</span>
            </div>

            <div>
              <b>📍 Nagole</b>
              <span>26 Bins · 6 Full</span>
            </div>

            <div>
              <b>📍 Dilsukhnagar</b>
              <span>28 Bins · 4 Full</span>
            </div>

          </div>
        </section>

        {/* Recent Activity */}
        <section className="main-grid">

          <div className="panel">
            <h2>Recent Requests</h2>

            <div className="list">
              <p>Request #125 - LB Nagar</p>
              <p>Request #126 - Meerpet</p>
              <p>Request #127 - Nagole</p>
              <p>Request #128 - Uppal</p>
            </div>
          </div>

          <div className="panel">
            <h2>Recent Complaints</h2>

            <div className="list">
              <p>Overflowing Bin - LB Nagar</p>
              <p>Bad Smell - Meerpet</p>
              <p>Damaged Bin - Nagole</p>
              <p>Garbage Not Collected - Uppal</p>
            </div>
          </div>

        </section>

      </main>

      <footer>
        © 2026 EcoBins | Smart Garbage Monitoring System
      </footer>
    </>
  );
}

export default AdminHome;