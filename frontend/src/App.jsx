import React, { useState, useEffect } from 'react';
import dbSimulada from './data/dbSimulada';
import api, {
  ServiciosAPI,
  BarberosAPI,
  SucursalesAPI,
  CitasAPI,
  PromocionesAPI,
  ClientesAPI,
  verificarEstadoBackend
} from './services/api';

// Componentes comunes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import HomePage from './pages/HomePage';
import ServicesCatalogPage from './pages/ServicesCatalogPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BarbersPage from './pages/BarbersPage';
import BranchesPage from './pages/BranchesPage';
import PromotionsPage from './pages/PromotionsPage';
import BookingPage from './pages/BookingPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import BookingFailedPage from './pages/BookingFailedPage';
import ClientPortalPage from './pages/ClientPortalPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  // Estado de navegación
  const [vistaActual, setVistaActual] = useState('inicio');

  // Estados de datos (Cargados desde dbSimulada / backend)
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [citas, setCitas] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  // Estados de contexto para el flujo de reserva
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [barberoSeleccionado, setBarberoSeleccionado] = useState(null);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [codigoPromoSeleccionado, setCodigoPromoSeleccionado] = useState('');

  // Resultado de agendamiento
  const [citaConfirmada, setCitaConfirmada] = useState(null);
  const [mensajeErrorCita, setMensajeErrorCita] = useState('');

  // Autenticación y modal
  const [usuario, setUsuario] = useState(null);
  const [modalLoginAbierto, setModalLoginAbierto] = useState(false);

  // Estado de conexión al backend Spring Boot (Gateway 8081)
  const [backendConectado, setBackendConectado] = useState(false);

  // 1. Carga inicial de datos y verificación de backend
  useEffect(() => {
    cargarDatos();
    comprobarBackend();
  }, []);

  const cargarDatos = () => {
    setServicios(dbSimulada.obtenerTodos('servicios'));
    setBarberos(dbSimulada.obtenerTodos('barberos'));
    setSucursales(dbSimulada.obtenerTodos('sucursales'));
    setCitas(dbSimulada.obtenerTodos('citas'));
    setPromociones(dbSimulada.obtenerTodos('promociones'));
    setInventario(dbSimulada.obtenerTodos('inventario'));
    setEmpleados(dbSimulada.obtenerTodos('empleados'));
  };

  const comprobarBackend = async () => {
    const conectado = await verificarEstadoBackend();
    setBackendConectado(conectado);
  };

  // 2. Operaciones de Navegación
  const navegar = (vista) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setVistaActual(vista);
  };

  // 3. Manejadores de Atajos de Agendamiento
  const iniciarAgendamientoConServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    navegar('agendamiento');
  };

  const iniciarAgendamientoConBarbero = (barbero) => {
    setBarberoSeleccionado(barbero);
    navegar('agendamiento');
  };

  const iniciarAgendamientoEnSucursal = (sucursal) => {
    setSucursalSeleccionada(sucursal);
    navegar('agendamiento');
  };

  const iniciarAgendamientoConPromo = (codigo) => {
    setCodigoPromoSeleccionado(codigo);
    navegar('agendamiento');
  };

  const verDetalleServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    navegar('detalle-servicio');
  };

  // 4. Finalización de Agendamiento
  const handleReservaExitosa = async (datosCita) => {
    const creada = await CitasAPI.agendar(datosCita);
    setCitas(dbSimulada.obtenerTodos('citas'));
    setCitaConfirmada(creada);
    navegar('reserva-exitosa');
  };

  const handleReservaFallida = (mensaje) => {
    setMensajeErrorCita(mensaje);
    navegar('reserva-fallida');
  };

  // 5. Operaciones CRUD para el Panel Administrativo
  const handleCrearServicio = async (nuevoServicio) => {
    await ServiciosAPI.crear(nuevoServicio);
    setServicios(dbSimulada.obtenerTodos('servicios'));
  };

  const handleActualizarServicio = async (id, datosActualizados) => {
    await ServiciosAPI.actualizar(id, datosActualizados);
    setServicios(dbSimulada.obtenerTodos('servicios'));
  };

  const handleEliminarServicio = async (id) => {
    await ServiciosAPI.eliminar(id);
    setServicios(dbSimulada.obtenerTodos('servicios'));
  };

  const handleCrearBarbero = async (nuevoBarbero) => {
    await BarberosAPI.crear(nuevoBarbero);
    setBarberos(dbSimulada.obtenerTodos('barberos'));
  };

  const handleEliminarBarbero = (id) => {
    dbSimulada.eliminar('barberos', id);
    setBarberos(dbSimulada.obtenerTodos('barberos'));
  };

  const handleCrearSucursal = async (nuevaSucursal) => {
    await SucursalesAPI.crear(nuevaSucursal);
    setSucursales(dbSimulada.obtenerTodos('sucursales'));
  };

  const handleEliminarSucursal = async (id) => {
    await SucursalesAPI.eliminar(id);
    setSucursales(dbSimulada.obtenerTodos('sucursales'));
  };

  const handleCambiarEstadoCita = async (id, nuevoEstado) => {
    await CitasAPI.cambiarEstado(id, nuevoEstado, usuario?.rol || 'ADMIN', usuario?.id);
    setCitas(dbSimulada.obtenerTodos('citas'));
  };

  const handleCancelarCita = async (id) => {
    await CitasAPI.cambiarEstado(id, 'CANCELADA', 'CLIENTE', usuario?.id || 1);
    setCitas(dbSimulada.obtenerTodos('citas'));
  };

  const handleCrearPromocion = async (nuevaPromo) => {
    await PromocionesAPI.crear(nuevaPromo);
    setPromociones(dbSimulada.obtenerTodos('promociones'));
  };

  const handleEliminarPromocion = async (id) => {
    await PromocionesAPI.eliminar(id);
    setPromociones(dbSimulada.obtenerTodos('promociones'));
  };

  const handleRestablecerDatos = () => {
    dbSimulada.restablecerDatos();
    cargarDatos();
  };

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column font-sans">
      {/* 1. BARRA DE NAVEGACIÓN SUPERIOR */}
      <Navbar
        vistaActual={vistaActual}
        onNavegar={navegar}
        usuario={usuario}
        onCerrarSesion={() => {
          setUsuario(null);
          navegar('inicio');
        }}
        onAbrirLogin={() => setModalLoginAbierto(true)}
        backendConectado={backendConectado}
      />

      {/* 2. CONTENIDO PRINCIPAL SEGÚN LA VISTA ACTIVA */}
      <main className="flex-grow-1">
        {vistaActual === 'inicio' && (
          <HomePage
            servicios={servicios}
            barberos={barberos}
            promociones={promociones}
            onNavegar={navegar}
            onSeleccionarServicio={verDetalleServicio}
            onSeleccionarBarbero={iniciarAgendamientoConBarbero}
          />
        )}

        {vistaActual === 'servicios' && (
          <ServicesCatalogPage
            servicios={servicios}
            onVerDetalle={verDetalleServicio}
            onAgendar={iniciarAgendamientoConServicio}
          />
        )}

        {vistaActual === 'detalle-servicio' && (
          <ServiceDetailPage
            servicio={servicioSeleccionado}
            barberos={barberos}
            onVolverAlCatalogo={() => navegar('servicios')}
            onAgendarServicio={iniciarAgendamientoConServicio}
          />
        )}

        {vistaActual === 'barberos' && (
          <BarbersPage
            barberos={barberos}
            onAgendarConBarbero={iniciarAgendamientoConBarbero}
          />
        )}

        {vistaActual === 'sucursales' && (
          <BranchesPage
            sucursales={sucursales}
            onAgendarEnSucursal={iniciarAgendamientoEnSucursal}
          />
        )}

        {vistaActual === 'promociones' && (
          <PromotionsPage
            promociones={promociones}
            onUsarPromocion={iniciarAgendamientoConPromo}
          />
        )}

        {vistaActual === 'agendamiento' && (
          <BookingPage
            servicios={servicios}
            barberos={barberos}
            sucursales={sucursales}
            promociones={promociones}
            citasExistentes={citas}
            servicioPreseleccionado={servicioSeleccionado}
            barberoPreseleccionado={barberoSeleccionado}
            sucursalPreseleccionada={sucursalSeleccionada}
            codigoPromoPreseleccionado={codigoPromoSeleccionado}
            usuario={usuario}
            onFinalizarExito={handleReservaExitosa}
            onFinalizarFallo={handleReservaFallida}
          />
        )}

        {vistaActual === 'reserva-exitosa' && (
          <BookingSuccessPage
            cita={citaConfirmada || {}}
            onVerMisCitas={() => navegar('mis-citas')}
            onVolverInicio={() => navegar('inicio')}
          />
        )}

        {vistaActual === 'reserva-fallida' && (
          <BookingFailedPage
            mensajeError={mensajeErrorCita}
            onReintentar={() => navegar('agendamiento')}
            onVolverInicio={() => navegar('inicio')}
          />
        )}

        {vistaActual === 'mis-citas' && (
          <ClientPortalPage
            usuario={usuario}
            citas={citas}
            onCancelarCita={handleCancelarCita}
            onAgendarNueva={() => navegar('agendamiento')}
          />
        )}

        {vistaActual === 'admin' && (
          <AdminDashboardPage
            servicios={servicios}
            barberos={barberos}
            sucursales={sucursales}
            citas={citas}
            promociones={promociones}
            inventario={inventario}
            empleados={empleados}
            onCrearServicio={handleCrearServicio}
            onActualizarServicio={handleActualizarServicio}
            onEliminarServicio={handleEliminarServicio}
            onCrearBarbero={handleCrearBarbero}
            onEliminarBarbero={handleEliminarBarbero}
            onCrearSucursal={handleCrearSucursal}
            onEliminarSucursal={handleEliminarSucursal}
            onCambiarEstadoCita={handleCambiarEstadoCita}
            onCrearPromocion={handleCrearPromocion}
            onEliminarPromocion={handleEliminarPromocion}
            onRestablecerDatos={handleRestablecerDatos}
          />
        )}
      </main>

      {/* 3. MODAL DE INICIO DE SESIÓN / REGISTRO */}
      {modalLoginAbierto && (
        <LoginPage
          onLoginExitoso={(usr) => {
            setUsuario(usr);
            setModalLoginAbierto(false);
          }}
          onRegistrarCliente={(nuevo) => {
            ClientesAPI.registrar(nuevo);
          }}
          onCerrar={() => setModalLoginAbierto(false)}
        />
      )}

      {/* 4. PIE DE PÁGINA */}
      <Footer onNavegar={navegar} />
    </div>
  );
}
