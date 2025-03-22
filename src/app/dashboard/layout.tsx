'use client';

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useState, useEffect } from "react";

/**
 * Layout para las páginas del dashboard que requieren autenticación
 * Todas las rutas bajo /dashboard estarán protegidas
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setShowSidebar(window.innerWidth >= 1024);
    };

    // Comprobar al montar el componente
    checkScreenSize();

    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', checkScreenSize);

    // Limpiar cuando se desmonte
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        {/* Layout principal */}
        <div className="flex flex-1">
          {/* Sidebar condicional */}
          {showSidebar && (
            <div className={`${isMobile ? 'fixed z-40 h-full' : 'relative'}`}>
              <DashboardSidebar />

              {/* Overlay para cerrar sidebar en móvil */}
              {isMobile && (
                <div
                  className="fixed inset-0 bg-black/30 z-30"
                  onClick={() => setShowSidebar(false)}
                ></div>
              )}
            </div>
          )}

          {/* Contenido principal */}
          <div className="flex-1 flex flex-col">
            <DashboardHeader toggleSidebar={toggleSidebar} />

            <main className="flex-1 bg-gray-50 p-4 md:p-6">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Alojamientos Vacacionales. Todos los derechos reservados.</p>
            </footer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
