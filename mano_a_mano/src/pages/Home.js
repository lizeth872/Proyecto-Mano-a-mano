import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import CoordinadorHome from './Coordinador'; // Asegúrate de que el archivo se llama 'Coordinador.js'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    // Usamos 'loading' para evitar que se renderice contenido antes de verificar la sesión
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Función asíncrona para obtener la sesión
        const checkUser = async () => {
            // El hook getUser() es un método asíncrono y debe ser llamado con await
            const { data: { user } } = await supabase.auth.getUser(); 
            
            if (!user) {
                // Si NO hay usuario, redirige a login
                navigate("/login");
            } else {
                // Si HAY usuario, marca como logueado
                setIsLoggedIn(true);
            }
            // Termina la carga
            setLoading(false);
        };

        checkUser();
        
        // La dependencia [navigate] es correcta
    }, [navigate]);

    // ----------------------------------------------------
    // Lógica de Redirección y Renderizado
    // ----------------------------------------------------

    if (loading) {
        // Muestra un estado de carga mientras verifica la sesión
        return <div className="loading-screen">Verificando sesión...</div>;
    }

    if (!isLoggedIn) {
        // Si no está logueado, esta parte no se debería ver, ya que useEffect ya te redirigió.
        // Se mantiene como una capa de seguridad.
        return null; 
    }

    // ⚠️ SOLUCIÓN TEMPORAL: Renderiza directamente el Dashboard de Coordinador 
    // (Asumiendo que todos los usuarios logueados son Coordinadores por ahora).
    return <CoordinadorHome />; 
}

export default Home;