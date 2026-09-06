import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

function Routing() {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(17.3194668, 78.5204844), // Bin 1
        L.latLng(17.3228255, 78.5278259), // Bin 2
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}

export default Routing;