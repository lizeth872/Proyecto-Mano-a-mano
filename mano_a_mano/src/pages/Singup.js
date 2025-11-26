import React, { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
// Opcional: Puedes usar alert, pero se recomienda una librería de notificaciones
// import { toast } from "react-toastify"; 

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    // Función para manejar el envío del formulario de registro
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Llama a la función de registro de Supabase
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error("Error en el registro:", error.message);
                alert(`Error al registrar: ${error.message}`);
                // toast.error(`Error al registrar: ${error.message}`);
            } else {
                // Si el registro es exitoso:
                // 1. Informa al usuario que revise su correo (si la confirmación está activa).
                alert("¡Registro exitoso! Por favor, revisa tu correo para verificar tu cuenta.");
                // toast.success("¡Registro exitoso! Revisa tu correo.");
                
                // 2. Redirige al login para que inicie sesión
                navigate("/login"); 
            }
        } catch (error) {
            console.error('Error inesperado:', error);
            alert("Ocurrió un error inesperado durante el registro.");
        }
    };

    return (
        <div>
            <h2>Registrar Nuevo Usuario</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    name="email"
                    placeholder="Tu correo electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit">REGISTRARSE</button>
            </form>
            <p>
                ¿Ya tienes una cuenta? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>Iniciar Sesión</span>
            </p>
        </div>
    );
}

export default Signup;