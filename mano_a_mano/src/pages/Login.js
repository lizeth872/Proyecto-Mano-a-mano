import {useState, useEffect} from "react";
import {supabase} from "../supabase/client";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    //Manejo de envío del formulario de ingreso al sistema
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //Lama a la función de inicio de sesión de Supabase
            const {error, user} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error('Error de autenticación:', error.message);
            alert(`Error: ${error.message}`);
        } else if (user) {
            navigate("/")
        }
        } catch (error) {
            console.error('Error en la llamada a la API:', error);
        }
    };

    //Verificar la sesión del usuario
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session) {
                navigate("/");
            }
        });
    }, [navigate]);

    return (
        <div className="login-container"> 
            {/* Columna Izquierda: Formulario */}
            <div className="login-form-side">
                <div className="login-content">
                    <h1>BIENVENIDO</h1>
                    <p>Sistema de administración de enfermería</p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            id="email"
                            placeholder="usuario@ejemplo.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Contraseña</label>
                        {/* Contenedor para la contraseña si quieres replicar el ojo */}
                        <div className="password-input-wrapper"> 
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="**********"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>

                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>

                        <button type="submit" className="login-button">INICIAR SESIÓN</button>
                    </form>
                </div>
            </div>

            {/* Columna Derecha: Imagen */}
            <div className="login-image-side">
                {/* La imagen de fondo se manejará con CSS */}
            </div>
        </div>
    )
}

export default Login