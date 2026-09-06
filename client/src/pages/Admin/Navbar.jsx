import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/admin" className="logo">
        🌱 EcoBins
      </Link>

      <div className="nav-links">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/bins">Bins</NavLink>
        <NavLink to="/admin/requests">Requests</NavLink>
        <NavLink to="/admin/complaints">Complaints</NavLink>
        <NavLink to="/admin/navigation">assign truck</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>
      </div>

      <div className="nav-buttons">
        <Link to="/admin/profile" className="profile">
          Profile
        </Link>

        <Link to="/" className="logout">
          Logout
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;