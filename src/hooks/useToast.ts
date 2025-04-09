/**
 * Hook para mostrar notificaciones tipo toast
 *
 * Este es un hook simple, en un proyecto real podrías usar una librería como react-hot-toast o react-toastify
 */

type ToastType = 'success' | 'error' | 'info' | 'warning';

export function useToast() {
  // En un proyecto real, implementarías un sistema completo de toasts
  // Por ahora, simplemente usamos console.log como ejemplo

  const showToast = (message: string, type: ToastType = 'info') => {
    // En desarrollo, mostrar por consola
    console.log(`[Toast - ${type}]: ${message}`);

    // En un proyecto real, aquí mostrarías el toast en la UI
    // Por ejemplo, con una librería o un sistema personalizado

    // Ejemplo de implementación con alert (sólo para demostración)
    if (typeof window !== 'undefined') {
      alert(`${type.toUpperCase()}: ${message}`);
    }
  };

  return { showToast };
}
