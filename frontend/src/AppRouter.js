import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DriverHomePage from './pages/DriverHomePage';
import RideRequestPage from './pages/RideRequestPage';
import RideHistoryPage from './pages/RideHistoryPage';
import NotFoundPage from './pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RideRequestPage} />
        <Route path="/driver" component={DriverHomePage} />
        <Route path="/history" component={RideHistoryPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
