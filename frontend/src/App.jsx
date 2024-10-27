import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />}></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />}></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
