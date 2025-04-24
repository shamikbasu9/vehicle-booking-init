import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DriverHomePage from './pages/DriverHomePage';
import RideRequestPage from './pages/RideRequestPage';
import RideHistoryPage from './pages/RideHistoryPage';
import NotFoundPage from './pages/NotFoundPage';
import WelcomeLogin from './pages/WelcomeLogin';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeLogin />} />
        <Route path="/home" element={<RideRequestPage />} />
        <Route path="/driver" element={<DriverHomePage />} />
        <Route path="/history" element={<RideHistoryPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* wildcard for 404 */}
      </Routes>
    </Router>
  );
}
