import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ⬇️ Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("Error de autenticación:", error.message);
                alert(`Error: ${error.message}`);
                return;
            }

            if (data?.user) {
                navigate("/", { replace: true });
            }

        } catch (err) {
            console.error("Error en la llamada a la API:", err);
        }
    };

    // ⬇️ Verificar sesión existente
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) navigate("/", { replace: true });
        };

        checkSession();
    }, [navigate]);

    return (
        <div className="login-container">

            {/* Columna izquierda */}
            <div className="login-form-side">
                <div className="login-content">

                    <h1>BIENVENIDO</h1>
                    <p>Sistema de administración de enfermería</p>

                    <form onSubmit={handleSubmit}>
                        
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="usuario@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Contraseña</label>
                        <div className="password-input-wrapper">
                            <input
                                type="password"
                                id="password"
                                placeholder="**********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <a className="forgot-password" href="#">
                            ¿Olvidaste tu contraseña?
                        </a>

                        <button type="submit" className="login-button">
                            INICIAR SESIÓN
                        </button>

                    </form>
                </div>
            </div>

            {/* Columna derecha con imagen */}
            <div className="login-image-side"></div>
        </div>
    );
}

export default Login;
