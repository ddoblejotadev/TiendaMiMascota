/**
 * CONSTANTES DE LA APLICACIÓN
 * Valores que se usan en múltiples lugares
 */

// Categorías de productos
export const CATEGORIAS = [
  'Todos',
  'Alimento',
  'Juguetes',
  'Accesorios',
  'Higiene',
  'Medicamentos'
];

// Estados de pedido
export const ESTADOS_PEDIDO = {
  PENDIENTE: 'pendiente',
  PROCESANDO: 'procesando',
  ENVIADO: 'enviado',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado'
};

// Configuración de la app
export const CONFIG = {
  NOMBRE_TIENDA: 'Mi Mascota',
  EMAIL_CONTACTO: 'contacto@mimascota.cl',
  TELEFONO: '+56 9 1234 5678',
  DIRECCION: 'Av. Principal 123, Santiago',
  HORARIO: 'Lunes a Viernes 9:00 - 18:00',
  IVA: 0.19 // 19% IVA
};

// Mensajes de validación
export const MENSAJES = {
  CAMPO_REQUERIDO: 'Este campo es obligatorio',
  EMAIL_INVALIDO: 'Ingrese un email válido',
  PASSWORD_CORTO: 'La contraseña debe tener al menos 6 caracteres',
  PASSWORDS_NO_COINCIDEN: 'Las contraseñas no coinciden',
  PRODUCTO_AGREGADO: 'Producto agregado al carrito',
  PRODUCTO_ELIMINADO: 'Producto eliminado del carrito',
  CARRITO_VACIO: 'El carrito está vacío',
  COMPRA_EXITOSA: 'Compra realizada con éxito',
  ERROR_GENERAL: 'Ocurrió un error. Por favor intenta nuevamente'
};