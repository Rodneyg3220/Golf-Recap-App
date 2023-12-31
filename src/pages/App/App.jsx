import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import GolfRoundListPage from '../GolfRoundListPage/GolfRoundListPage';
import NavBar from '../../components/NavBar/NavBar';
import EditRoundPage from '../EditRoundPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/rounds" element={<GolfRoundListPage />} />
            <Route path="/rounds/:id/edit" element={<EditRoundPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
