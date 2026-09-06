import React, { useState } from "react";
import "./home.css";

const areaData = {
  "Warangal North": [
    { id: "B01", location: "Kazipet", fill: 92, lat: 17.9689, lng: 79.5941 },
    { id: "B02", location: "Hanamkonda", fill: 78, lat: 17.9784, lng: 79.5941 }
  ],

  "Warangal South": [
    { id: "B03", location: "NIT Area", fill: 88, lat: 17.984, lng: 79.53 },
    { id: "B04", location: "Subedari", fill: 65, lat: 17.995, lng: 79.57 }
  ],

  "Central Area": [
    {
      id: "B05",
      location: "Warangal Central",
      fill: 95,
      lat: 17.9784,
      lng: 79.5949
    }
  ]
};

const trucks = ["TRUCK-01", "TRUCK-02", "TRUCK-03", "TRUCK-04"];

export default function AssignTruck() {
  const [area, setArea] = useState("");
  const [truck, setTruck] = useState("");
  const [assigned, setAssigned] = useState([]);

  const bins = areaData[area] || [];

  const assignTruck = () => {
    if (!area || !truck) return;

    const alreadyAssigned = assigned.some(
      (item) => item.truck === truck
    );

    if (alreadyAssigned) {
      alert("This truck is already assigned.");
      return;
    }

    setAssigned([
      ...assigned,
      {
        area,
        truck,
        bins: bins.length,
        status: "Assigned"
      }
    ]);

    setArea("");
    setTruck("");
  };

  const navigate = (selectedArea) => {
    const selectedBins = areaData[selectedArea];

    if (!selectedBins?.length) return;

    const destination =
      `${selectedBins[0].lat},${selectedBins[0].lng}`;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
      "_blank"
    );
  };

  return (
    <div className="ecobin-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Truck Collection</h1>
          <p>Assign collection trucks to garbage areas</p>
        </div>

        <div className="truck-count">
          <span>{assigned.length}</span>
          <small>Assigned Trucks</small>
        </div>
      </div>

      {/* ASSIGN SECTION */}
      <div className="assign-box">

        <div className="box-title">
          <div className="title-icon">🚛</div>

          <div>
            <h2>Assign Collection Truck</h2>
            <p>Select an area and assign an available truck</p>
          </div>
        </div>

        <div className="form-row">

          <div className="input-group">
            <label>Collection Area</label>

            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Select area</option>

              {Object.keys(areaData).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Available Truck</label>

            <select
              value={truck}
              onChange={(e) => setTruck(e.target.value)}
            >
              <option value="">Select truck</option>

              {trucks.map((item) => {
                const used = assigned.some(
                  (truckItem) => truckItem.truck === item
                );

                return (
                  <option
                    key={item}
                    value={item}
                    disabled={used}
                  >
                    {item} {used ? "(Assigned)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="assign-button"
            onClick={assignTruck}
            disabled={!area || !truck}
          >
            Assign Truck
          </button>

        </div>
      </div>

      {/* ASSIGNED TRUCKS */}
      <div className="section">

        <div className="section-header">
          <div>
            <h2>Assigned Trucks</h2>
            <p>Current area-wise collection assignments</p>
          </div>
        </div>

        {assigned.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">🚛</div>
            <h3>No trucks assigned</h3>
            <p>Assign a truck to an area to see it here.</p>
          </div>
        ) : (
          <div className="assigned-grid">

            {assigned.map((item, index) => (

              <div className="assigned-card" key={index}>

                <div className="card-top">

                  <div className="truck-icon">
                    🚛
                  </div>

                  <div>
                    <h3>{item.truck}</h3>
                    <span>{item.area}</span>
                  </div>

                  <div className="status">
                    {item.status}
                  </div>

                </div>

                <div className="card-info">

                  <div>
                    <small>Area</small>
                    <strong>{item.area}</strong>
                  </div>

                  <div>
                    <small>Bins</small>
                    <strong>{item.bins}</strong>
                  </div>

                </div>

                <button
                  className="navigate-button"
                  onClick={() => navigate(item.area)}
                >
                  <span>↗</span>
                  Navigate Collection Route
                </button>

              </div>

            ))}

          </div>
        )}
      </div>

      {/* AREA BINS */}
      {area && (
        <div className="section">

          <div className="section-header">
            <div>
              <h2>{area}</h2>
              <p>Bins requiring collection</p>
            </div>
          </div>

          <div className="bin-table">

            {bins
              .sort((a, b) => b.fill - a.fill)
              .map((bin) => (

                <div className="bin-row" key={bin.id}>

                  <div className="bin-name">
                    <div className="bin-symbol">●</div>

                    <div>
                      <strong>{bin.id}</strong>
                      <span>{bin.location}</span>
                    </div>
                  </div>

                  <div className="fill-info">
                    <div className="fill-bar">
                      <div
                        style={{ width: `${bin.fill}%` }}
                      />
                    </div>

                    <strong>{bin.fill}%</strong>
                  </div>

                  <div
                    className={
                      bin.fill >= 80
                        ? "priority high"
                        : "priority normal"
                    }
                  >
                    {bin.fill >= 80 ? "High Priority" : "Normal"}
                  </div>

                </div>

              ))}

          </div>
        </div>
      )}

    </div>
  );
}