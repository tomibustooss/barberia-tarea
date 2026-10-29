export const mockServices = [
  {
    id: 1,
    nombre: 'Corte clásico',
    descripcion: 'Corte moderno con precisión y estilo clásico para cualquier tipo de cabello.',
    precio: 18000,
    duracionMinutos: 40,
    categoria: 'Cabello',
    popular: true,
    imagen: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    nombre: 'Corte + barba',
    descripcion: 'Servicio completo para mantener cabello y barba con un look cuidado y profesional.',
    precio: 26000,
    duracionMinutos: 60,
    categoria: 'Combo',
    popular: true,
    imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    nombre: 'Perfilado de barba',
    descripcion: 'Perfilado, delineado y cuidado para una barba impecable en cada visita.',
    precio: 12000,
    duracionMinutos: 30,
    categoria: 'Barba',
    popular: false,
    imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    nombre: 'Afeitado premium',
    descripcion: 'Afeitado con toalla caliente, productos premium y atención personalizada.',
    precio: 15000,
    duracionMinutos: 35,
    categoria: 'Facial',
    popular: false,
    imagen: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80'
  }
];

export const mockBarbers = [
  {
    id: 1,
    nombre: 'Miguel Ortega',
    especialidad: 'Cortes modernos',
    experiencia: '8 años',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    calificacion: 4.9,
    descripcion: 'Especialista en cortes contemporáneos con buen manejo de líneas y volumen.'
  },
  {
    id: 2,
    nombre: 'Lucas Rojas',
    especialidad: 'Barba y perfilado',
    experiencia: '6 años',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    calificacion: 4.8,
    descripcion: 'Enfocado en barba, acabados limpios y estética facial con atención al detalle.'
  },
  {
    id: 3,
    nombre: 'Diego Álvarez',
    especialidad: 'Estilos clásicos',
    experiencia: '10 años',
    foto: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=500&q=80',
    calificacion: 5.0,
    descripcion: 'Con experiencia en cortes formales y looks clásicos para distintas personalidades.'
  }
];

export const mockBranches = [
  {
    id: 1,
    nombre: 'Sucursal Centro',
    direccion: 'Av. Brasil 1250, Providencia',
    horario: 'Lun - Dom: 9:00 - 20:00',
    telefono: '+56 9 8765 4321'
  },
  {
    id: 2,
    nombre: 'Sucursal Las Condes',
    direccion: 'Los Dominicos 342, Las Condes',
    horario: 'Lun - Sáb: 10:00 - 21:00',
    telefono: '+56 9 8822 1133'
  },
  {
    id: 3,
    nombre: 'Sucursal Quilicura',
    direccion: 'Calle de la Reforma 99, Quilicura',
    horario: 'Lun - Vie: 8:30 - 19:30',
    telefono: '+56 9 8234 5590'
  }
];

export const mockPromotions = [
  {
    id: 1,
    titulo: 'Combo corte + barba',
    descuento: '20% OFF',
    descripcion: 'Válido esta semana en todas las sucursales.',
    vigencia: 'Hasta el 31 de octubre'
  },
  {
    id: 2,
    titulo: 'Lunes barbero',
    descuento: '15% OFF',
    descripcion: 'Descuento para agendamientos realizados en lunes.',
    vigencia: 'Todo octubre'
  },
  {
    id: 3,
    titulo: 'Primera visita',
    descuento: '10% OFF',
    descripcion: 'Promoción para clientes nuevos en la barbería.',
    vigencia: 'Válido por tiempo limitado'
  }
];

export const mockAppointments = [
  {
    id: 101,
    clienteId: 1,
    clienteNombre: 'Ana García',
    barberoId: 1,
    barberoNombre: 'Miguel Ortega',
    servicioId: 1,
    servicioNombre: 'Corte clásico',
    sucursalId: 1,
    sucursalNombre: 'Sucursal Centro',
    fecha: '2026-11-02',
    hora: '10:30',
    estado: 'CONFIRMADA'
  },
  {
    id: 102,
    clienteId: 1,
    clienteNombre: 'Ana García',
    barberoId: 2,
    barberoNombre: 'Lucas Rojas',
    servicioId: 3,
    servicioNombre: 'Perfilado de barba',
    sucursalId: 2,
    sucursalNombre: 'Sucursal Las Condes',
    fecha: '2026-11-04',
    hora: '17:00',
    estado: 'PENDIENTE'
  }
];

export const mockClientes = [
  {
    id: 1,
    nombre: 'Ana García',
    correo: 'ana@correo.cl',
    telefono: '+56 9 4567 1234'
  }
];

export const mockAdminRecords = {
  servicios: mockServices,
  barberos: mockBarbers,
  sucursales: mockBranches,
  citas: mockAppointments,
  promociones: mockPromotions,
  inventario: [
    { id: 1, producto: 'Gel para cabello', stock: 32, categoria: 'Producto de cuidado' },
    { id: 2, producto: 'Máquina de recorte', stock: 4, categoria: 'Equipo' }
  ],
  pagos: [
    { id: 1, concepto: 'Corte clásico', monto: 18000, metodo: 'Tarjeta', estado: 'Pagado' },
    { id: 2, concepto: 'Combo corte + barba', monto: 26000, metodo: 'WebPay', estado: 'Pendiente' }
  ]
};
