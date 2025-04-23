import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RideHistoryPage() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const response = await axios.get('/api/rides');
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching ride history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRideHistory();
  }, []);

  if (loading) {
    return <div>Loading ride history...</div>;
  }

  return (
    <div>
      <h2>Ride History</h2>
      {rides.length === 0 ? (
        <p>No ride history found</p>
      ) : (
        <ul>
          {rides.map((ride) => (
            <li key={ride._id}>
              <h3>Pickup: {ride.pickupLocation.lat}, {ride.pickupLocation.lng}</h3>
              <p>Dropoff: {ride.dropoffLocation.lat}, {ride.dropoffLocation.lng}</p>
              <p>Status: {ride.status}</p>
              <p>Requested At: {new Date(ride.requestedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
