import './App.css'
import {useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MedicoDashboard from "./pages/MedicoDashboard";


import {supabase} from './supabase/client';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login') //si el usuario no esta autenticado se envia a login
      }else {
        navigate('/') //si el usuario ya esta autenticado envialo a home 
      }
    });
  }, [])
  return (
    <div className="App">
      <Routes> 
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/" element={<MedicoDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
