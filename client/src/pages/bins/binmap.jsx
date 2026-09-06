import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";

// =====================================================
// FIX LEAFLET DEFAULT ICON
// =====================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// =====================================================
// GET COLOR ACCORDING TO FILL LEVEL
// =====================================================

function getBinColor(level) {
  if (level <= 50) {
    return "green";
  }

  if (level <= 80) {
    return "yellow";
  }

  return "red";
}

// =====================================================
// CREATE BIN ICON
// =====================================================

function createBinIcon(level) {
  const color = getBinColor(level);

  return L.divIcon({
    className: "bin-icon",

    html: `
      <div
        style="
          width: 25px;
          height: 25px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(0,0,0,0.5);
        "
      ></div>
    `,

    iconSize: [31, 31],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
}

// =====================================================
// MAP COMPONENT
// =====================================================

function MapViewBins() {

  const [bins, setBins] = useState([]);

  // ===================================================
  // GET BIN DATA FROM BACKEND
  // ===================================================

  useEffect(() => {

    const getBins = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/api/bindata"
        );

        if (!response.ok) {
          throw new Error("Failed to get bin data");
        }

        const data = await response.json();

        console.log("DATA RECEIVED FROM BACKEND:");
        console.log(data);

        setBins(data);

      } catch (error) {

        console.error(
          "Error receiving bin data:",
          error
        );

      }

    };

    // Get data immediately
    getBins();

    // Check backend every 5 seconds
    const interval = setInterval(getBins, 5000);

    return () => clearInterval(interval);

  }, []);

  // ===================================================
  // BINS REQUIRING COLLECTION
  // LEVEL > 50%
  // ===================================================

  const collectionBins = bins
    .filter(
      (bin) =>
        Number(bin.fillLevel) > 50
    )
    .sort(
      (a, b) =>
        Number(b.fillLevel) -
        Number(a.fillLevel)
    );

  // ===================================================
  // CREATE COLLECTION ROUTE
  // ===================================================

  const routeCoordinates =
    collectionBins.map((bin) => [
      Number(bin.Latitude),
      Number(bin.Longitude),
    ]);

  // ===================================================
  // MAP
  // ===================================================

  return (

    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >

      <MapContainer
        center={[
          17.346472,
          78.550635,
        ]}
        zoom={14}
        style={{
          height: "500px",
          width: "100%",
        }}
      >

        {/* ==========================================
            OPEN STREET MAP
        ========================================== */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ==========================================
            COLLECTION ROUTE
        ========================================== */}

        {routeCoordinates.length >= 2 && (

          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: "blue",
              weight: 5,
              opacity: 0.8,
            }}
          />

        )}

        {/* ==========================================
            BIN LOCATIONS
        ========================================== */}

        {bins.map((bin) => {

          const level =
            Number(bin.fillLevel) || 0;

          return (

            <Marker
              key={bin.id}
              position={[
                Number(bin.Latitude),
                Number(bin.Longitude),
              ]}
              icon={createBinIcon(level)}
            >

              <Popup>

                <div>

                  <h3
                    style={{
                      margin: "0 0 8px 0",
                    }}
                  >
                    {bin.id}
                  </h3>

                  <b>
                    Fill Level: {level}%
                  </b>

                  <br />

                  Latitude: {bin.Latitude}

                  <br />

                  Longitude: {bin.Longitude}

                  <br />

                  Status:{" "}

                  <b>
                    {level <= 50
                      ? "Normal"
                      : level <= 80
                      ? "Warning"
                      : "Full"}
                  </b>

                  <br />

                  {level > 50 && (

                    <span
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Collection Required
                    </span>

                  )}

                </div>

              </Popup>

            </Marker>

          );

        })}

      </MapContainer>

      {/* ==========================================
          LEGEND
      ========================================== */}

      <div
        style={{
          position: "absolute",
          right: "15px",
          bottom: "15px",
          zIndex: 1000,
          background: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.3)",
          fontSize: "14px",
        }}
      >

        <b>Bin Status</b>

        <div>
          <span
            style={{
              color: "green",
              fontSize: "20px",
            }}
          >
            ●
          </span>
          {" "}0–50% Normal
        </div>

        <div>
          <span
            style={{
              color: "gold",
              fontSize: "20px",
            }}
          >
            ●
          </span>
          {" "}51–80% Warning
        </div>

        <div>
          <span
            style={{
              color: "red",
              fontSize: "20px",
            }}
          >
            ●
          </span>
          {" "}81–100% Full
        </div>

        <hr />

        <div>
          <span
            style={{
              color: "blue",
              fontSize: "20px",
            }}
          >
            ━
          </span>
          {" "}Collection Route
        </div>

      </div>

    </div>
  );
}

export default MapViewBins;