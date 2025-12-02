import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import "./MedicoDashboard.css";

const TABLA = "Paciente";

const MedicoDashboard = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      const { data, error } = await supabase.from(TABLA).select("*");

      if (error) {
        console.error(error);
        setError("Error al cargar pacientes");
      } else {
        setPacientes(data || []);
      }
      setCargando(false);
    };

    cargar();
  }, []);

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const calcularEdad = (fechaISO) => {
    if (!fechaISO) return "-";
    const fn = new Date(fechaISO);
    if (Number.isNaN(fn.getTime())) return "-";
    const hoy = new Date();
    let edad = hoy.getFullYear() - fn.getFullYear();
    const m = hoy.getMonth() - fn.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) {
      edad--;
    }
    return `${edad} años`;
  };

  const handleVerPaciente = (paciente) => {
    alert(
      `Paciente: ${paciente.Nombre} ${paciente.A_Paterno || ""} ${
        paciente.A_Materno || ""
      }`
    );
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
              type="button"
              className="tab-agregar-paciente"
              onClick={() => navigate("/pacientes/nuevo")}
              >
            Agregar paciente
            </button>

          </div>

          {cargando && (
            <p style={{ padding: "10px 24px" }}>Cargando pacientes...</p>
          )}
          {error && (
            <p style={{ padding: "10px 24px", color: "red" }}>{error}</p>
          )}

          <div className="pacientes-tabla">
            <div className="pacientes-tabla-header">
              <span className="col-estado"></span>
              <span className="col-nombre">Nombre</span>
              <span className="col-apellidos">Apellidos</span>
              <span className="col-cama">Sexo</span>
              <span className="col-piso">Identificación</span>
              <span className="col-hora">Edad</span>
              <span className="col-acciones"></span>
            </div>

            {pacientes.map((p) => (
              <div key={p.ID} className="pacientes-fila fila-azul">
                <div className="col-estado"></div>
                <div className="col-nombre">{p.Nombre}</div>
                <div className="col-apellidos">
                  {(p.A_Paterno || "") + " " + (p.A_Materno || "")}
                </div>
                <div className="col-cama">{p.Sexo || "-"}</div>
                <div className="col-piso">{p["Identificación"] || "-"}</div>
                <div className="col-hora">{calcularEdad(p.F_nacimiento)}</div>
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

            {!cargando && !error && pacientes.length === 0 && (
              <p style={{ padding: "10px 24px" }}>
                No hay pacientes registrados todavía.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MedicoDashboard;
