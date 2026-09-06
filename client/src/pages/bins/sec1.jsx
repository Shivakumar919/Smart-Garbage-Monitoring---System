import "./sec1.css";
import MapView from "./binmap";
import { useEffect, useState, useCallback } from "react";

function Sector1() {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // =====================================================
  // FETCH DATA FROM BACKEND
  // =====================================================

  const fetchBins = useCallback(async (manual = false) => {
    try {
      if (manual) {
        setRefreshing(true);
      }

      const response = await fetch(
        "http://localhost:5000/api/bindata"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bin data");
      }

      const data = await response.json();

      console.log("Latest backend data:", data);

      // Convert backend data
      const formattedBins = data.map((bin) => ({
        id: bin.id,
        level: Number(bin.fillLevel),
        status: bin.status,
        lat: Number(bin.Latitude),
        lng: Number(bin.Longitude),
      }));

      setBins(formattedBins);
      setError("");
      setLastUpdated(new Date());

    } catch (err) {
      console.error("Error fetching bins:", err);
      setError("Unable to load bin data");

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // =====================================================
  // INITIAL FETCH + AUTO REFRESH
  // =====================================================

  useEffect(() => {
    fetchBins();

    // Automatically update every 5 seconds
    const interval = setInterval(() => {
      fetchBins();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchBins]);

  // =====================================================
  // COLLECTION ROUTE
  // ONLY BINS ABOVE 50%
  // =====================================================

  const collectionRoute = [...bins]
    .filter((bin) => bin.level > 50)
    .sort((a, b) => b.level - a.level);

  // =====================================================
  // HIGHEST LEVEL
  // =====================================================

  const highestLevel =
    bins.length > 0
      ? Math.max(...bins.map((bin) => bin.level))
      : 0;

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="sector-page">
        <div className="loading-state">
          <h2>Loading bin data...</h2>
          <p>Connecting to smart waste monitoring server.</p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && bins.length === 0) {
    return (
      <main className="sector-page">
        <div className="error-state">
          <h2>{error}</h2>

          <p>
            Make sure your backend is running on port 5000.
          </p>

          <button
            className="refresh-btn"
            onClick={() => fetchBins(true)}
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="sector-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="sector-header">

        <div>
          <span className="breadcrumb">
            ADMIN / SECTORS / SECTOR 1
          </span>

          <h1>Sector 1 — LB Nagar</h1>

          <p>
            Smart waste collection monitoring and
            collection route management.
          </p>

          {lastUpdated && (
            <small className="last-updated">
              Last updated:{" "}
              {lastUpdated.toLocaleTimeString()}
            </small>
          )}
        </div>

        <div className="header-actions">

          <div className="sector-status">
            <span className="status-dot"></span>
            Live Monitoring
          </div>

          <button
            className="refresh-btn"
            onClick={() => fetchBins(true)}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "↻ Refresh Data"}
          </button>

        </div>

      </header>

      {/* =================================================
          ERROR WHILE OLD DATA IS STILL AVAILABLE
      ================================================= */}

      {error && (
        <div className="error-banner">
          {error}. Showing the last received data.
        </div>
      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <section className="sector-stats">

        <div className="stat-card">
          <span>Total Bins</span>
          <strong>{bins.length}</strong>
          <small>Sector 1</small>
        </div>

        <div className="stat-card warning">
          <span>Collection Required</span>
          <strong>{collectionRoute.length}</strong>
          <small>Above 50%</small>
        </div>

        <div className="stat-card">
          <span>Highest Fill Level</span>
          <strong>{highestLevel}%</strong>
          <small>
            {highestLevel > 80
              ? "Critical"
              : highestLevel > 50
              ? "Warning"
              : "Normal"}
          </small>
        </div>

        <div className="stat-card">
          <span>Route Status</span>
          <strong>
            {collectionRoute.length > 0
              ? "Ready"
              : "Clear"}
          </strong>

          <small>
            {collectionRoute.length > 0
              ? `${collectionRoute.length} stops`
              : "No collection required"}
          </small>
        </div>

      </section>

      {/* =================================================
          MAIN GRID
      ================================================= */}

      <section className="sector-grid">

        {/* =================================================
            COLLECTION ROUTE LIST
        ================================================= */}

        <div className="route-card">

          <div className="card-header">

            <div>
              <span className="section-label">
                COLLECTION ROUTE
              </span>

              <h2>Priority Collection</h2>
            </div>

            <span className="route-count">
              {collectionRoute.length} Stops
            </span>

          </div>

          <div className="route-list">

            {collectionRoute.length === 0 ? (

              <div className="empty-route">
                <strong>No collection required</strong>
                <p>
                  All bins are currently at or below 50%.
                </p>
              </div>

            ) : (

              collectionRoute.map((bin, index) => (

                <div
                  className="route-item"
                  key={bin.id}
                >

                  <div className="route-number">
                    {index + 1}
                  </div>

                  {index !==
                    collectionRoute.length - 1 && (
                    <div className="route-line"></div>
                  )}

                  <div className="route-info">

                    <div className="bin-top">

                      <div>
                        <strong>{bin.id}</strong>

                        <span className="bin-location">
                          LB Nagar • Sector 1
                        </span>
                      </div>

                      <span
                        className={`fill-badge ${
                          bin.level >= 80
                            ? "critical"
                            : "high"
                        }`}
                      >
                        {bin.level}%
                      </span>

                    </div>

                    <div className="collection-action">

                      <span>
                        {index === 0
                          ? "Highest priority"
                          : `After ${
                              collectionRoute[index - 1].id
                            }`}
                      </span>

                      <span className="coordinates">
                        {bin.lat.toFixed(5)},{" "}
                        {bin.lng.toFixed(5)}
                      </span>

                    </div>

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

        {/* =================================================
            MAP
        ================================================= */}

        <div className="map-card">

          <div className="card-header">

            <div>
              <span className="section-label">
                LIVE MAP
              </span>

              <h2>Bin Locations & Route</h2>
            </div>

            <span className="map-status">
              ● Live
            </span>

          </div>

          <div className="sector-map">

            {/* IMPORTANT:
                Send ALL bins to map.
                Map itself decides which bins
                belong to collection route.
            */}

            <MapView bins={bins} />

          </div>

          <div className="map-footer">

            <div>
              <span className="legend-dot normal-dot"></span>
              0–50%
            </div>

            <div>
              <span className="legend-dot high-dot"></span>
              51–80%
            </div>

            <div>
              <span className="legend-dot critical-dot"></span>
              81–100%
            </div>

            <div>
              <span className="route-symbol"></span>
              Route
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          BACKEND DATA TABLE
      ================================================= */}

      <section className="bin-table-card">

        <div className="card-header">

          <div>
            <span className="section-label">
              BACKEND DATA
            </span>

            <h2>Current Bin Status</h2>
          </div>

          <span className="data-count">
            {bins.length} Bins
          </span>

        </div>

        <div className="table-wrapper">

          <table className="bin-table">

            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Fill Level</th>
                <th>Status</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>

            <tbody>

              {bins.map((bin) => (

                <tr key={bin.id}>

                  <td>
                    <strong>{bin.id}</strong>
                  </td>

                  <td>
                    <span
                      className={`table-level ${
                        bin.level >= 80
                          ? "critical"
                          : bin.level > 50
                          ? "high"
                          : "normal"
                      }`}
                    >
                      {bin.level}%
                    </span>
                  </td>

                  <td>{bin.status}</td>

                  <td>{bin.lat}</td>

                  <td>{bin.lng}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default Sector1;