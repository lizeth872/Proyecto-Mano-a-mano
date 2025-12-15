import React, { useState } from 'react';
import './dashboard.css';
import Perfil from '../images/cuenta.png';
function Dashboard() {
    return(
        <div id='main_dash'>
            <div id='sidebar'>
                <ul>
                    <li><div className='item'><b>Pacientes</b></div><div className='arrow'>&gt;</div></li>
                    <li><div className='item'><b>Personal</b></div><div className='arrow'>&gt;</div></li>
                    <li><div className='item'><b>Área</b></div><div className='arrow'>&gt;</div></li>
                    <li><div className='item'><b>Dashoard</b></div><div className='arrow'>&gt;</div></li>
                </ul>
            </div>
            <div id='user-info'>
                <div id='nurse-name'><b>Hola $</b> - Piso $</div>
                <div className='speciality'>Pediatría</div>
            </div>
            <div id='session'>
                <img src={Perfil} alt='Perfil' id='profile-pic'/>
                <button id='close-session'><b>Cerrar sesión</b></button>
            </div>
        </div>
    );
} export default Dashboard;