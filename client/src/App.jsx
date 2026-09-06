import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/landingpage/Home";
import AdminHome from "./pages/Admin/Home";
import Navigation from "./pages/Admin/navigation/home";
import User from "./pages/User/Home";

import Bins from "./pages/Admin/binmap";
import BinDetails from "./pages/bins/bindetails";

import Sectors from "./pages/bins/sec";
import Sector1 from "./pages/bins/sec1";

import Reports from "./pages/Admin/reports"
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/bins" element={<Bins />} />
        <Route path="/admin/navigation" element={<Navigation />} />

        {/* User */}
        <Route path="/user" element={<User />} />

        {/* ================= SECTORS ================= */}

        {/* Remaining / All Sectors */}
        <Route
          path="/bins/sec"
          element={<Sectors />}
        />

        {/* Sector 1 - LB Nagar */}
        <Route
          path="/bins/sec1"
          element={<Sector1 />}
        />

        {/* Bin Details */}
        <Route
          path="/admin/sectors/sector-1/"
          element={<BinDetails />}
        />
        // reports
        <Route
          path="/admin/reports"
          element={<Reports />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;