'use client';

import ProtectedRoute from "@/components/auth/ProtectedRoute";

/**
 * Layout para las páginas del dashboard que requieren autenticación
 * Todas las rutas bajo /dashboard estarán protegidas
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        {/* Aquí puedes agregar componentes específicos del dashboard como navbar, sidebar, etc. */}
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
