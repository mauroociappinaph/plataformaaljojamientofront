'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface PaginationProps {
  /**
   * Página actual
   */
  currentPage: number;

  /**
   * Total de páginas
   */
  totalPages: number;

  /**
   * Callback cuando se cambia de página
   */
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  // Si solo hay una página, no mostramos nada
  if (totalPages <= 1) return null;

  // Determinar qué botones de página mostrar (siempre mostramos máximo 5)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    // Caso 1: Tenemos 5 o menos páginas en total
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    // Caso 2: Estamos en las primeras páginas
    if (currentPage <= 3) {
      return [1, 2, 3, 4, totalPages];
    }

    // Caso 3: Estamos en las últimas páginas
    if (currentPage >= totalPages - 2) {
      return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // Caso 4: Estamos en el medio
    return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
  };

  const pageNumbers = getPageNumbers();

  // Estilos comunes para los botones
  const baseButtonStyles = "w-10 h-10 flex items-center justify-center rounded-md";
  const activeButtonStyles = "bg-vacacional-salvia text-white font-medium";
  const inactiveButtonStyles = "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200";
  const disabledButtonStyles = "bg-gray-100 text-gray-400 cursor-not-allowed";

  return (
    <nav aria-label="Paginación" className="flex items-center space-x-2">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonStyles} ${
          currentPage === 1 ? disabledButtonStyles : inactiveButtonStyles
        }`}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* Botones de Página */}
      {pageNumbers.map((pageNumber, index) => {
        // Agregar puntos suspensivos si hay saltos
        const showEllipsis = index > 0 && pageNumber > pageNumbers[index - 1] + 1;

        return (
          <div key={pageNumber} className="flex items-center">
            {showEllipsis && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`${baseButtonStyles} ${
                currentPage === pageNumber ? activeButtonStyles : inactiveButtonStyles
              }`}
              aria-label={`Página ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          </div>
        );
      })}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonStyles} ${
          currentPage === totalPages ? disabledButtonStyles : inactiveButtonStyles
        }`}
        aria-label="Página siguiente"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
}
