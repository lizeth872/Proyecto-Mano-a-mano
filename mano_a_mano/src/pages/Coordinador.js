import React from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

function CoordinadorHome() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            // La redirección a /login se manejará automáticamente por el useEffect en App.js
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión.');
        }
    };

    return (
        <div className="supervisor-home-container">
            <header className="dashboard-header">
                <h1>Panel de Supervisión de Enfermería</h1>
                <nav>
                    {/* Botón de ejemplo para gestión */}
                    <button className="nav-button">Gestión de Turnos</button>
                    <button className="nav-button">Métricas de Rendimiento</button>
                    <button onClick={handleLogout} className="logout-button">
                        Cerrar Sesión
                    </button>
                </nav>
            </header>
            
            <main className="dashboard-main-content">
                <section className="widget assignment-widget">
                    <h2>Asignación de Personal y Camas</h2>
                    <p>Aquí se listarán las camas y el personal disponible. (FUTURA LÓGICA DE ASIGNACIÓN)</p>
                    {/* Ejemplo de un botón para la herramienta principal */}
                    <button className="primary-action-button">Ir a Asignar</button>
                </section>
                
                <section className="widget status-widget">
                    <h2>Estado del Piso (P-10)</h2>
                    <ul>
                        <li>**Camas Ocupadas:** 15/20</li>
                        <li>**Personal Activo en Turno:** 5 Enfermeros</li>
                        <li>**Registros Pendientes:** 2 (Urgente)</li>
                    </ul>
                </section>

                <section className="widget alerts-widget">
                    <h2>Alertas y Novedades</h2>
                    <p>⚠️ El stock de medicamento 'X' está bajo.</p>
                </section>
            </main>
            
        </div>
    );
}

export default CoordinadorHome;