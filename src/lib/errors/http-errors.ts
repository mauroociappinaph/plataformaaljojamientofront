export class HttpError extends Error {
const ERROR_MESSAGES = {
  TIMEOUT: 'La solicitud ha excedido el tiempo de espera',
  NETWORK: 'Error de conexión con el servidor',
  UNKNOWN: 'Error desconocido',
  ABORTED: 'La solicitud fue cancelada por timeout',
};
}
