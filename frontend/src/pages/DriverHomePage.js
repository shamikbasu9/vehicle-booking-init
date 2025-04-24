import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DriverHomePage() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch rides that need drivers
    const fetchRides = async () => {
      try {
        const response = await axios.get('/api/rides');
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const handleAcceptRide = async (rideId) => {
    try {
      await axios.patch(`/api/rides/${rideId}`, { status: 'accepted' });
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === rideId ? { ...ride, status: 'accepted' } : ride
        )
      );
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  const handleRejectRide = async (rideId) => {
    try {
      await axios.patch(`/api/rides/${rideId}`, { status: 'rejected' });
      setRides((prevRides) =>
        prevRides.filter((ride) => ride._id !== rideId)
      );
    } catch (error) {
      console.error('Error rejecting ride:', error);
    }
  };

  if (loading) {
    return <div>Loading rides...</div>;
  }

  return (
    <div>
      <h2>Available Ride Requests</h2>
      {rides.length === 0 ? (
        <p>No available ride requests</p>
      ) : (
        <ul>
          {rides.map((ride) => (
            <li key={ride._id}>
              <h3>Pickup: {ride.pickupLocation.lat}, {ride.pickupLocation.lng}</h3>
              <p>Dropoff: {ride.dropoffLocation.lat}, {ride.dropoffLocation.lng}</p>
              <p>Additional Info: {ride.additionalInfo}</p>
              <p>Status: {ride.status}</p>
              {ride.status === 'requested' && (
                <div>
                  <button onClick={() => handleAcceptRide(ride._id)}>Accept</button>
                  <button onClick={() => handleRejectRide(ride._id)}>Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
