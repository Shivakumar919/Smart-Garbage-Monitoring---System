import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Route from Bin 1 to Bin 2
function Routing() {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(17.3238440, 78.5379902), // Bin 1
        L.latLng(17.3460838, 78.5509523), // Bin 3
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  return null;
}

function MapView() {
  return (
    <MapContainer
      center={[17.3238440, 78.5379902]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[17.3238440, 78.5379902]}>
        <Popup>
          Bin 1 <br />
          80% Full
        </Popup>
      </Marker>

      <Marker position={[17.3228255, 78.5278259]}>
        <Popup>
          Bin 2 <br />
          98% Full
        </Popup>
      </Marker>

      <Marker position={[17.3460838, 78.5509523]}>
        <Popup>
          Bin 3 <br />
          30% Full
        </Popup>
      </Marker>

      <Marker position={[17.3394194, 78.5250539]}>
        <Popup>
          Bin 4 <br />
          60% Full
        </Popup>
      </Marker>

      {/* Route from Bin 1 to Bin 2 */}
      <Routing />
    </MapContainer>
  );
}

export default MapView;