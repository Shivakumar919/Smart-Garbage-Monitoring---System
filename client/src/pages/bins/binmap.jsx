import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// =====================================================
// CREATE COLORED BIN ICON
// =====================================================

const createBinIcon = (
  level,
  isStart = false,
  stopNumber = null
) => {

  // -----------------------------------------------
  // HIGHEST WASTE = TRUCK START
  // -----------------------------------------------

  if (isStart) {

    return L.divIcon({

      className: "custom-start-marker",

      html: `
        <div style="
          position: relative;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #dc2626;
          border: 4px solid white;
          box-shadow: 0 4px 14px rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
        ">
          🚛

          <span style="
            position: absolute;
            top: -10px;
            right: -12px;
            background: #111827;
            color: white;
            padding: 3px 7px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: bold;
          ">
            START
          </span>

        </div>
      `,

      iconSize: [55, 55],

      iconAnchor: [27.5, 27.5],

      popupAnchor: [0, -27.5],
    });
  }

  // -----------------------------------------------
  // NORMAL BIN COLORS
  // -----------------------------------------------

  let background = "#22c55e";

  if (level >= 81) {

    background = "#ef4444";

  } else if (level > 50) {

    background = "#f59e0b";

  }

  return L.divIcon({

    className: "custom-bin-marker",

    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: ${background};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 13px;
        font-weight: bold;
      ">
        ${stopNumber || "●"}
      </div>
    `,

    iconSize: [34, 34],

    iconAnchor: [17, 17],

    popupAnchor: [0, -17],
  });
};

// =====================================================
// BLUE COLLECTION STOP ICON
// =====================================================

const createStopIcon = (number) => {

  return L.divIcon({

    className: "collection-stop-marker",

    html: `
      <div style="
        width: 31px;
        height: 31px;
        border-radius: 50%;
        background: #2563eb;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 13px;
        font-weight: bold;
      ">
        ${number}
      </div>
    `,

    iconSize: [31, 31],

    iconAnchor: [15.5, 15.5],

    popupAnchor: [0, -15.5],
  });
};

// =====================================================
// MAP VIEW
// =====================================================

function MapView({
  bins = [],
  collectionRoute = [],
}) {

  const [roadRoute, setRoadRoute] = useState([]);

  const [routeInfo, setRouteInfo] = useState({
    distance: 0,
    duration: 0,
  });

  const [routeError, setRouteError] = useState("");

  // =====================================================
  // HIGHEST WASTE BIN
  //
  // Sector1 sorts collectionRoute descending by level.
  // Therefore [0] is always the highest-waste bin.
  // =====================================================

  const startBin =
    collectionRoute.length > 0
      ? collectionRoute[0]
      : null;

  // =====================================================
  // OSRM ROUTING
  // =====================================================

  useEffect(() => {

    let cancelled = false;

    const getRoadRoute = async () => {

      // Need at least two bins for a route
      if (collectionRoute.length < 2) {

        setRoadRoute([]);

        setRouteInfo({
          distance: 0,
          duration: 0,
        });

        setRouteError("");

        return;
      }

      try {

        setRouteError("");

        // ---------------------------------------------
        // OSRM FORMAT:
        // longitude,latitude
        // ---------------------------------------------

        const coordinates =
          collectionRoute
            .map(
              (bin) =>
                `${bin.lng},${bin.lat}`
            )
            .join(";");

        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${coordinates}` +
          `?overview=full&geometries=geojson`;

        console.log(
          "OSRM route request:",
          url
        );

        const response =
          await fetch(url);

        if (!response.ok) {

          throw new Error(
            "OSRM request failed"
          );

        }

        const data =
          await response.json();

        if (
          data.code !== "Ok" ||
          !data.routes ||
          data.routes.length === 0
        ) {

          throw new Error(
            "OSRM could not find road route"
          );

        }

        if (cancelled) return;

        const route =
          data.routes[0];

        // ---------------------------------------------
        // OSRM gives:
        //
        // [longitude, latitude]
        //
        // Leaflet needs:
        //
        // [latitude, longitude]
        // ---------------------------------------------

        const leafletCoordinates =
          route.geometry.coordinates.map(
            ([lng, lat]) => [
              lat,
              lng,
            ]
          );

        setRoadRoute(
          leafletCoordinates
        );

        setRouteInfo({

          distance:
            route.distance,

          duration:
            route.duration,

        });

      } catch (error) {

        if (!cancelled) {

          console.error(
            "OSRM routing error:",
            error
          );

          setRoadRoute([]);

          setRouteInfo({
            distance: 0,
            duration: 0,
          });

          setRouteError(
            "Road route could not be loaded."
          );

        }

      }

    };

    getRoadRoute();

    return () => {
      cancelled = true;
    };

  }, [collectionRoute]);

  // =====================================================
  // MAP CENTER
  // =====================================================

  const center =
    bins.length > 0
      ? [
          bins[0].lat,
          bins[0].lng,
        ]
      : [
          17.3850,
          78.4867,
        ];

  // =====================================================
  // RETURN MAP
  // =====================================================

  return (

    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >

      <MapContainer
        center={center}
        zoom={14}
        style={{
          height: "100%",
          width: "100%",
        }}
      >

        {/* =================================================
            OPEN STREET MAP
        ================================================= */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =================================================
            ALL BIN MARKERS
        ================================================= */}

        {bins.map((bin) => {

          const routeIndex =
            collectionRoute.findIndex(
              (routeBin) =>
                routeBin.id === bin.id
            );

          const isStart =
            startBin &&
            bin.id === startBin.id;

          return (

            <Marker
              key={bin.id}
              position={[
                bin.lat,
                bin.lng,
              ]}
              icon={createBinIcon(
                bin.level,
                isStart,
                routeIndex >= 0
                  ? routeIndex + 1
                  : null
              )}
              zIndexOffset={
                isStart ? 2000 : 1000
              }
            >

              <Popup>

                <strong>
                  {bin.id}
                </strong>

                <br />

                Fill Level:
                {" "}
                {bin.level}%

                <br />

                Status:
                {" "}
                {bin.status}

                {/* ========================================
                    TRUCK START
                ======================================== */}

                {isStart && (

                  <>

                    <hr />

                    <strong
                      style={{
                        color: "#dc2626",
                      }}
                    >
                      🚛 TRUCK START
                    </strong>

                    <br />

                    Highest waste:
                    {" "}
                    {bin.level}%

                    <br />

                    Collection stop:
                    {" "}
                    #1

                  </>

                )}

                {/* ========================================
                    OTHER COLLECTION STOP
                ======================================== */}

                {!isStart &&
                  routeIndex >= 0 && (

                    <>

                      <hr />

                      <strong>
                        Collection Stop #
                        {routeIndex + 1}
                      </strong>

                    </>

                  )}

              </Popup>

            </Marker>

          );

        })}

        {/* =================================================
            COLLECTION STOP MARKERS
        ================================================= */}

        {collectionRoute.map(
          (bin, index) => {

            // Highest waste already has
            // truck START marker

            if (index === 0) {
              return null;
            }

            return (

              <Marker
                key={
                  `stop-${bin.id}`
                }
                position={[
                  bin.lat,
                  bin.lng,
                ]}
                icon={createStopIcon(
                  index + 1
                )}
                zIndexOffset={1500}
              >

                <Popup>

                  <strong>
                    Collection Stop #
                    {index + 1}
                  </strong>

                  <br />

                  Bin:
                  {" "}
                  {bin.id}

                  <br />

                  Waste:
                  {" "}
                  {bin.level}%

                </Popup>

              </Marker>

            );

          }
        )}

        {/* =================================================
            OSRM ROAD ROUTE
        ================================================= */}

        {roadRoute.length > 0 && (

          <Polyline
            positions={roadRoute}
            pathOptions={{
              color: "#2563eb",
              weight: 6,
              opacity: 0.9,
            }}
          />

        )}

      </MapContainer>

      {/* =================================================
          TRUCK START INFORMATION
      ================================================= */}

      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          background: "white",
          padding: "13px 16px",
          borderRadius: "10px",
          boxShadow:
            "0 3px 12px rgba(0,0,0,0.25)",
          minWidth: "210px",
        }}
      >

        {startBin ? (

          <>

            <strong
              style={{
                display: "block",
                color: "#dc2626",
                fontSize: "15px",
                marginBottom: "5px",
              }}
            >
              🚛 Truck Starting Point
            </strong>

            <div>

              <strong>
                {startBin.id}
              </strong>

            </div>

            <div>
              Waste:
              {" "}
              <strong>
                {startBin.level}%
              </strong>
            </div>

            <div
              style={{
                marginTop: "5px",
                fontSize: "12px",
              }}
            >
              Highest-waste bin
            </div>

            {routeInfo.distance > 0 && (

              <>

                <hr />

                <div>
                  Route distance:
                  {" "}
                  {(routeInfo.distance / 1000)
                    .toFixed(2)}
                  {" "}
                  km
                </div>

                <div>
                  Estimated time:
                  {" "}
                  {Math.round(
                    routeInfo.duration / 60
                  )}
                  {" "}
                  min
                </div>

              </>

            )}

          </>

        ) : (

          <strong>
            No collection required
          </strong>

        )}

        {routeError && (

          <div
            style={{
              marginTop: "8px",
              color: "#dc2626",
              fontSize: "12px",
            }}
          >
            {routeError}
          </div>

        )}

      </div>

      {/* =================================================
          MAP LEGEND
      ================================================= */}

      <div
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          zIndex: 1000,
          background: "white",
          padding: "10px 13px",
          borderRadius: "8px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.25)",
          fontSize: "12px",
          lineHeight: "1.9",
        }}
      >

        <div>
          🟢 Normal — 0–50%
        </div>

        <div>
          🟠 High — 51–80%
        </div>

        <div>
          🔴 Critical — 81–100%
        </div>

        <div>
          🚛 Truck starts at highest waste
        </div>

        <div>
          🔵 Blue line — OSRM road route
        </div>

      </div>

    </div>

  );
}

export default MapView;