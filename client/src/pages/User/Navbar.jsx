
function Navbar() {
  return (
    <nav className="navbar">
      <h2>🗑️ EcoBin</h2>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/nearby">Nearby Bins</a>
        <a href="/request">Request Collection</a>
        <a href="/complaint">Complaint</a>
        <a href="/profile">Profile</a>
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;