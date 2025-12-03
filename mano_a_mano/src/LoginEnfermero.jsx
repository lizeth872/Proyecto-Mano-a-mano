import React, { useState } from 'react';
import { supabase } from './supabaseClient'; 
import './login.css'
import LoginImage from './images/loginImage.jpg'

function LoginEnfermeroPersonalizado({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data: enfermeroData, error: dbError } = await supabase
      .from('Enfermero')
      // Declaración de columnas a consultar
      .select('*') 
      .eq('Correo electrónico', email) 
      .eq('Contraseña', password)
      .single(); 

    if (dbError && dbError.code !== 'PGRST116') { // PGRST116 = No Rows Found
      setErrorMsg('Error al conectar con la base de datos: ' + dbError.message);
      setLoading(false);
      return;
    }

    if (enfermeroData) {
      // Login Exitoso
      alert('¡Acceso concedido! Bienvenido/a ' + enfermeroData.Nombre);
      onLoginSuccess(enfermeroData);
    } else {
      // Fila no encontrada
      setErrorMsg('Credenciales inválidas. Correo o Contraseña incorrectos.');
    }
    
    setLoading(false);
  };

  return (
  
    <div id='main'>
    <div className='from-cont'> 
    <form onSubmit={handleLogin} style={{ 
        maxWidth: '400px', 
        margin: '50px auto', 
        padding: '20px', 
        className: 'login-form' 
    }}>
      <div className='title'>BIENVENIDO</div>
      <div className='subtitle'>Sistema de administración de enfermería</div>
      
      {errorMsg && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMsg}</p>}
      <br/><br/><br/>
      <div>
        <label htmlFor="email" className='label-title'>Email:</label>
        <br/>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='usuario@ejemplo.com'
          className='input-template'
        />
      </div>

      <div>
        <br/>
        <label htmlFor="password" className='label-title'>Contraseña:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder=' * * * * * * * *'
          className='input-template2'
        />
      </div>
      <a className='forgot'>¿Olvidaste tu contraseña?</a>
      <br/><br/><br/><br/>
      <button type="submit" disabled={loading} style={{ 
          width: '100%',
          height: '7vh', 
          fontSize: 'large',
          padding: '10px', 
          backgroundColor: loading ? '#aaa' : '#2C6CBF', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: loading ? 'default' : 'pointer',
          className: 'submit-button'
      }}>
        {loading ? 'Verificando...' : 'Iniciar Sesión'}
      </button>
    </form>
    </div> 
    <div className='image-container'>
      <img src={LoginImage} className="login-image"/>
    </div>
    
    </div>
  );
}

export default LoginEnfermeroPersonalizado;