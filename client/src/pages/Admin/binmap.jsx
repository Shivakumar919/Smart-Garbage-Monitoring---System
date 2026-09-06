import "./bin.css";
import View from "../Admin/mapviewbins";
import { useNavigate } from "react-router-dom";

function Bins() {
  const navigate = useNavigate();

  // =====================================================
  // MOCK SECTOR DATA
  // Later, replace this with backend data
  // =====================================================
  const bins = [
    {
      id: "SECTOR-1",
      area: "LB Nagar",
      level: 98,
      status: "Full",
    },
    {
      id: "SECTOR-2",
      area: "Meerpet",
      level: 76,
      status: "Almost Full",
    },
    {
      id: "SECTOR-3",
      area: "Nagole",
      level: 45,
      status: "Normal",
    },
    {
      id: "SECTOR-4",
      area: "Dilsukhnagar",
      level: 91,
      status: "Full",
    },
  ];

  return (
    <main className="bins-page">

      {/* =================================================
          PAGE HEADER
          ================================================= */}
      <div className="bins-header">

        <div>
          <small>ADMIN / BINS</small>

          <h1>Smart Bin Locations</h1>

          <p>
            Monitor the location and current status of all
            smart waste sectors.
          </p>
        </div>

        {/* Refresh button */}
        <button className="refresh-btn">
          ↻ Refresh
        </button>

      </div>


      {/* =================================================
          MAIN LAYOUT
          LEFT  → MAP
          RIGHT → SECTOR LIST
          ================================================= */}
      <div className="bins-layout">


        {/* =================================================
            MAP SECTION
            ================================================= */}
        <section className="map-box">

          {/* Map header */}
          <div className="map-title">

            <h2>📍 Sector Locations</h2>

            <span>
              {bins.length} Sectors
            </span>

          </div>

          {/* Map */}
          <div className="map-area">
            <View />
          </div>

        </section>


        {/* =================================================
            SECTOR LIST SECTION
            ================================================= */}
        <section className="bin-list">

          {/* List header */}
          <div className="list-header">

            <h2>All Sectors</h2>

            <input
              type="text"
              placeholder="Search sector..."
            />

          </div>


          {/* =================================================
              LOOP THROUGH ALL SECTORS
              ================================================= */}
          {bins.map((bin) => (

            /* =================================================
               MAIN CLICKABLE SECTOR CARD

               Sector 1 → /admin/sectors/sector-1

               All other sectors → /sec

               Change the navigate() URLs below when you
               create separate pages for each sector.
               ================================================= */
            <div
              className="bin-item"
              key={bin.id}
              style={{ cursor: "pointer" }}

              onClick={() => {

                // =================================================
                // SECTOR 1
                // Opens Sector1.jsx
                // =================================================
                if (bin.id === "SECTOR-1") {
                  navigate("/bins/sec1");
                }

                // =================================================
                // OTHER SECTORS
                // Currently opens /sec
                //
                // Later you can change this to:
                //
                // SECTOR-2 → /admin/sectors/sector-2
                // SECTOR-3 → /admin/sectors/sector-3
                // SECTOR-4 → /admin/sectors/sector-4
                // =================================================
                else {
                  navigate("/bins/sec");
                }

              }}
            >

              {/* =================================================
                  SECTOR ICON
                  ================================================= */}
              <div className="bin-icon">
                🗑️
              </div>


              {/* =================================================
                  SECTOR INFORMATION
                  Shows sector ID and area
                  ================================================= */}
              <div className="bin-info">

                <strong>
                  {bin.id}
                </strong>

                <span>
                  📍 {bin.area}
                </span>

              </div>


              {/* =================================================
                  SECTOR STATUS
                  Shows waste percentage and status
                  ================================================= */}
              <div className="bin-status">

                {/* Waste level */}
                <b>
                  {bin.level}%
                </b>

                {/* Waste status */}
                <small
                  className={
                    bin.status
                      .replace(" ", "-")
                      .toLowerCase()
                  }
                >
                  {bin.status}
                </small>

              </div>

            </div>

          ))}

        </section>

      </div>

    </main>
  );
}

export default Bins;