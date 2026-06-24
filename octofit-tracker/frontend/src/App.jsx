import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './config/api';

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-dark text-white py-3 mb-3">
        <div className="container">
          <h1 className="h3 mb-2">OctoFit Tracker</h1>
          <p className="mb-0">Presentation tier with React 19 + Router + Codespaces-aware API URLs.</p>
        </div>
      </header>

      <nav className="container mb-3">
        <ul className="nav nav-pills gap-2 flex-wrap">
          <li className="nav-item">
            <NavLink to="/users" className="nav-link">Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teams" className="nav-link">Teams</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/activities" className="nav-link">Activities</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
          </li>
        </ul>
        <p className="small text-muted mt-3 mb-0">Current API base: {apiBaseUrl}</p>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
