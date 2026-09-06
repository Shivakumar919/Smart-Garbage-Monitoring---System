import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in React/Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function Viewbins() {
  const bins = [
    { id: 1, lat: 17.346472, lng: 78.550635 },
    { id: 2, lat: 17.345363, lng: 78.550233 },
    { id: 3, lat: 17.344194, lng: 78.548257 },
    { id: 4, lat: 17.342635, lng: 78.547399 },
    { id: 5, lat: 17.347691, lng: 78.547636 },
    { id: 6, lat: 17.350907, lng: 78.540368 },
    { id: 7, lat: 17.352822, lng: 78.535653 },
    { id: 8, lat: 17.357846, lng: 78.544650 },
    { id: 9, lat: 17.343920, lng: 78.554525 },
    { id: 10, lat: 17.341428, lng: 78.558080 },
    { id: 11, lat: 17.341539, lng: 78.548369 },
  ];

  return (
    <MapContainer
      center={[17.323844, 78.5379902]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* All bin locations */}
      {bins.map((bin) => (
        <Marker key={bin.id} position={[bin.lat, bin.lng]}>
          <Popup>
            <b>Bin {bin.id}</b>
            <br />
            Latitude: {bin.lat}
            <br />
            Longitude: {bin.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Viewbins;