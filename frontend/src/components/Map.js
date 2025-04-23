import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token

export default function Map({ setLocation, currentLocation, label }) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [currentLocation.lng || 0, currentLocation.lat || 0], // Set the map center to current location
      zoom: 12,
    });

    // Add a marker when the user clicks on the map
    map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      setLocation({ lat, lng }); // Update the parent component with the selected coordinates
    });

    return () => map.remove();
  }, [currentLocation, setLocation]);

  return (
    <div>
      <label>{label}</label>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
}
