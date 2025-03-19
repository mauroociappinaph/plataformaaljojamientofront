'use client';

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h2 className="font-medium text-lg mb-2">Información del usuario</h2>
              <p><span className="font-medium">Nombre:</span> {user.name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Rol:</span> {user.role}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => logout()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <p>Cargando información del usuario...</p>
        )}
      </div>
    </div>
  );
}
