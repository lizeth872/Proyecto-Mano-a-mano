import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import "./IngresoPaciente.css";

const TABLA = "Paciente";

const COLUMNS = {
  nombre: "Nombre",
  paterno: "A_Paterno",
  materno: "A_Materno",
  nacimiento: "F_nacimiento",
  sexo: "Sexo",
  identificacion: "Identificación",
  peso: "Peso",
  altura: "Altura",
};

const IngresoPaciente = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    fechaIngreso: "",
    fechaNacimiento: "",
    nivelUrgencia: "",
    sexo: "",
    identificacion: "",
    telefono: "",
    telEmergencia1: "",
    nombreEmergencia1: "",
    parentesco1: "",
    peso: "",
    altura: "",
  });

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.paterno) {
      alert("Nombre y apellido paterno son obligatorios");
      return;
    }

    const registro = {
      [COLUMNS.nombre]: formData.nombre,
      [COLUMNS.paterno]: formData.paterno,
      [COLUMNS.materno]: formData.materno || null,
      [COLUMNS.nacimiento]: formData.fechaNacimiento || null,
      [COLUMNS.sexo]: formData.sexo || null,
      [COLUMNS.identificacion]: formData.identificacion || null,
      [COLUMNS.peso]: formData.peso ? Number(formData.peso) : null,
      [COLUMNS.altura]: formData.altura ? Number(formData.altura) : null,
    };

    const { data, error } = await supabase
  .from(TABLA)
  .insert([registro])
  .select()
  .single();

if (error) {
  console.error("ERROR SUPABASE INSERT:", error);
  alert("No se pudo guardar el paciente: " + error.message);
  return;
}


    alert("Paciente registrado correctamente.");

    navigate("/");

  };

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      setResultados([]);
      return;
    }

    setCargandoBusqueda(true);

    const { data, error } = await supabase
      .from(TABLA)
      .select("*")
      .ilike(COLUMNS.nombre, `%${busqueda}%`);

    if (error) {
      console.error(error);
      alert("Error al buscar paciente.");
    } else {
      setResultados(data || []);
    }

    setCargandoBusqueda(false);
  };

  return (
    <div className="ingreso-layout">
      <aside className="ingreso-sidebar">
        <div className="sidebar-menu">
          <button className="sidebar-item sidebar-item-active">
            Pacientes
          </button>
          <button className="sidebar-item">Personal</button>
          <button className="sidebar-item">Áreas</button>
          <button className="sidebar-item">Dashboard</button>
        </div>

        <div className="triage-box">
          <h4>TRIAGE</h4>
          <div className="triage-level triage-resus">RESUCITACIÓN I</div>
          <div className="triage-level triage-emerg">EMERGENCIA</div>
          <div className="triage-level triage-urg">URGENCIA</div>
          <div className="triage-level triage-urg-menor">URGENCIA MENOR</div>
          <div className="triage-level triage-sin">SIN URGENCIA</div>
        </div>
      </aside>

      <main className="ingreso-main">
        <header className="ingreso-header">
          <button
            type="button"
            className="link-regresar"
            onClick={() => navigate("/")}
          >
            &lt; Regresar
          </button>
          <h1>Ingreso de Paciente</h1>
        </header>

        <div className="ingreso-content">
          <section className="ingreso-form-card">
            <h3>Datos personales</h3>

            <form className="ingreso-form" onSubmit={handleSubmit}>
              <div className="campo-form">
                <label>
                  Nombre del paciente <span className="obligatorio">*</span>
                </label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="campo-form">
                <label>
                  Apellido paterno <span className="obligatorio">*</span>
                </label>
                <input
                  name="paterno"
                  value={formData.paterno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="campo-form">
                <label>Apellido materno</label>
                <input
                  name="materno"
                  value={formData.materno}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Fecha de ingreso</label>
                <input
                  type="datetime-local"
                  name="fechaIngreso"
                  value={formData.fechaIngreso}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Nivel de urgencia</label>
                <select
                  name="nivelUrgencia"
                  value={formData.nivelUrgencia}
                  onChange={handleChange}
                >
                  <option value="">Seleccione…</option>
                  <option value="resucitacion">Resucitación I</option>
                  <option value="emergencia">Emergencia</option>
                  <option value="urgencia">Urgencia</option>
                  <option value="urgencia_menor">Urgencia menor</option>
                  <option value="sin_urgencia">Sin urgencia</option>
                </select>
              </div>

              <div className="campo-form">
                <label>Sexo</label>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                >
                  <option value="">Seleccione…</option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                  <option value="O">Otro</option>
                </select>
              </div>

              <div className="campo-form">
                <label>Identificación</label>
                <input
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Altura (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                />
              </div>

              <h3 className="subtitulo">Datos de contacto</h3>

              <div className="campo-form wide">
                <label>Número telefónico</label>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Número de contacto de emergencia</label>
                <input
                  name="telEmergencia1"
                  value={formData.telEmergencia1}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Nombre de contacto de emergencia</label>
                <input
                  name="nombreEmergencia1"
                  value={formData.nombreEmergencia1}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Parentesco</label>
                <input
                  name="parentesco1"
                  value={formData.parentesco1}
                  onChange={handleChange}
                />
              </div>

              <div className="acciones-form">
                <button type="submit" className="btn-guardar">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>

          <section className="ingreso-busqueda">
            <div className="busqueda-header">
              <label>Buscar paciente</label>
              <div className="busqueda-input-row">
                <input
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Nombre del paciente"
                />
                <button type="button" onClick={handleBuscar}>
                  🔍
                </button>
              </div>
            </div>

            <div className="busqueda-resultados">
              <h4>Resultados de la búsqueda</h4>
              {cargandoBusqueda ? (
                <p>Cargando…</p>
              ) : resultados.length === 0 ? (
                <p className="texto-vacio">Sin resultados</p>
              ) : (
                <ul>
                  {resultados.map((p) => (
                    <li key={p.ID}>
                      {p.Nombre} {p.A_Paterno} {p.A_Materno}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default IngresoPaciente;
