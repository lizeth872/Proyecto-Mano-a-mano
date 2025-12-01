import React from "react";
import { supabase } from "../supabase/client";
import "./MedicoDashboard.css";

const MedicoDashboard = () => {
  const pacientes = [
    {
      id: 1,
      nombre: "Rolando",
      apellidos: "Mora Aguilar",
      cama: "5",
      piso: "2",
      horaEntrada: "12/10/2025 11:59 hrs",
      nuevo: true,
      colorFila: "fila-amarilla",
    },
    {
      id: 2,
      nombre: "Fausta",
      apellidos: "Robles Mondragón",
      cama: "2",
      piso: "1",
      horaEntrada: "11/10/2025 18:32 hrs",
      nuevo: false,
      colorFila: "fila-azul",
    },
  ];

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleAgregarPaciente = () => {
    alert("Aquí iría el formulario para agregar paciente 🙂");
  };

  const handleVerPaciente = (paciente) => {
    alert(`Ver detalles de ${paciente.nombre}`);
  };

  return (
    <div className="medico-dashboard">
      <aside className="medico-sidebar">
        <div className="sidebar-menu">
          <button className="sidebar-item sidebar-item-active">
            Pacientes
          </button>
          <button className="sidebar-item">Turno/Horario</button>
        </div>

        <div className="triage-box">
          <h4>TRIAGE</h4>
          <div className="triage-level triage-resus">RESUCITACIÓN</div>
          <div className="triage-level triage-emerg">EMERGENCIA</div>
          <div className="triage-level triage-urg">URGENCIA</div>
          <div className="triage-level triage-urg-menor">URGENCIA MENOR</div>
          <div className="triage-level triage-sin">SIN URGENCIA</div>
        </div>
      </aside>

      <main className="medico-main">
        <header className="medico-header">
          <div className="medico-header-left">
            <span className="medico-saludo">Hola José Luis</span>
          </div>

          <div className="medico-header-right">
            <div className="medico-avatar">
              <span>👤</span>
            </div>
            <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="pacientes-card">
          <div className="pacientes-card-header">
            <h2>Pacientes asignados</h2>

            <button
              className="tab-agregar-paciente"
              onClick={handleAgregarPaciente}
            >
              Agregar paciente
            </button>
          </div>

          <div className="pacientes-tabla">
            <div className="pacientes-tabla-header">
              <span className="col-estado"></span>
              <span className="col-nombre">Nombre</span>
              <span className="col-apellidos">Apellidos</span>
              <span className="col-cama">Cama</span>
              <span className="col-piso">Piso</span>
              <span className="col-hora">Hora entrada</span>
              <span className="col-acciones"></span>
            </div>

            {pacientes.map((p) => (
              <div
                key={p.id}
                className={`pacientes-fila ${p.colorFila}`}
              >
                <div className="col-estado">
                  {p.nuevo && <span className="badge-nuevo">Nuevo</span>}
                </div>
                <div className="col-nombre">{p.nombre}</div>
                <div className="col-apellidos">{p.apellidos}</div>
                <div className="col-cama">{p.cama}</div>
                <div className="col-piso">{p.piso}</div>
                <div className="col-hora">{p.horaEntrada}</div>
                <div className="col-acciones">
                  <button
                    className="btn-plus"
                    onClick={() => handleVerPaciente(p)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MedicoDashboard;
