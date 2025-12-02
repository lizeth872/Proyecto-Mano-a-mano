import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MedicoDashboard from "./pages/MedicoDashboard";
import IngresoPaciente from "./pages/IngresoPaciente";

import { supabase } from "./supabase/client";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const path = window.location.pathname;
      if (!session && path !== "/login" && path !== "/signup") {
        navigate("/login", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MedicoDashboard />} />

        <Route path="/pacientes/nuevo" element={<IngresoPaciente />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
