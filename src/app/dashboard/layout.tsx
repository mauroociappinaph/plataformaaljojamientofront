'use client';

import { ReactNode } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

/**
 * Layout para las páginas del dashboard que requieren autenticación
 * Todas las rutas bajo /dashboard estarán protegidas
 */
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gray-50">
      {/* Sidebar de navegación */}
      <DashboardSidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-6 xl:p-8 overflow-auto">
        {children}

        {/* Footer */}
        <footer className="mt-auto pt-8 text-center text-sm text-gray-500">
          <p>© 2025 Alojamientos Vacacionales. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
