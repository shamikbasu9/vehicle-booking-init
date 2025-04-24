import { useState } from 'react';
import axios from 'axios';
import Map from './Map'; // Import the Map component

export default function RideRequestForm() {
  const [pickupLocation, setPickupLocation] = useState({ lat: '', lng: '' });
  const [dropoffLocation, setDropoffLocation] = useState({ lat: '', lng: '' });
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupLocation.lat || !pickupLocation.lng || !dropoffLocation.lat || !dropoffLocation.lng) {
      setError('Both pickup and dropoff locations must be filled.');
      return;
    }

    setLoading(true);
    setError('');

    const rideRequest = {
      pickupLocation,
      dropoffLocation,
      additionalInfo,
      status: 'requested', // Initial status
      requestedAt: new Date().toISOString(), // Current time as requestedAt
    };

    try {
      // Send the ride request to the backend
      const response = await axios.post('/api/rides', rideRequest);
      console.log('Ride request created:', response.data);
      // Optionally, clear the form or show a success message
      setPickupLocation({ lat: '', lng: '' });
      setDropoffLocation({ lat: '', lng: '' });
      setAdditionalInfo('');
      alert('Ride request submitted successfully!');
    } catch (err) {
      console.error('Error submitting ride request:', err);
      setError('There was an error submitting your ride request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  console.log("I am inside RideRequestForm")
  return (
    <div>
      <h2>Request a Ride</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pickup Location (Latitude, Longitude)</label>
          <Map
            setLocation={setPickupLocation}
            currentLocation={pickupLocation}
            label="Pick a Pickup Location"
          />
        </div>

        <div>
          <label>Dropoff Location (Latitude, Longitude)</label>
          <Map
            setLocation={setDropoffLocation}
            currentLocation={dropoffLocation}
            label="Pick a Dropoff Location"
          />
        </div>

        <div>
          <label>Additional Info (Optional)</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Any special requests or notes?"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Ride Request'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
