
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


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
    </MapContainer>
  );
}

export default MapView;