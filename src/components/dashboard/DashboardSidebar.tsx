'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Building2, Calendar, Heart, Settings, LogOut } from 'lucide-react';

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Determinar rol del usuario
  const userRole = user?.role || 'USER';

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="bg-white w-64 h-full min-h-screen shadow-md flex flex-col">
      {/* Cabecera del sidebar */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-vacacional-salvia">Mi cuenta</h2>
        <div className="flex items-center mt-4">
          <div className="h-10 w-10 rounded-full bg-vacacional-salvia/20 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-6 w-6 text-vacacional-salvia" />
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium text-sm">{user?.name || 'Usuario'}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <li>
            <Link href="/dashboard"
              className={`flex items-center px-4 py-2 text-sm ${
                isActive('/dashboard')
                  ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Home className="h-4 w-4 mr-3" />
              Inicio
            </Link>
          </li>

          <li>
            <Link href="/dashboard/profile"
              className={`flex items-center px-4 py-2 text-sm ${
                isActive('/dashboard/profile')
                  ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <User className="h-4 w-4 mr-3" />
              Mi perfil
            </Link>
          </li>

          <li>
            <Link href="/dashboard/favorites"
              className={`flex items-center px-4 py-2 text-sm ${
                isActive('/dashboard/favorites')
                  ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Heart className="h-4 w-4 mr-3" />
              Favoritos
            </Link>
          </li>

          {/* Opciones para HOST */}
          {(userRole === 'HOST' || userRole === 'ADMIN') && (
            <>
              <li className="pt-2">
                <div className="px-4 py-1 text-xs text-gray-400 uppercase font-semibold tracking-wider">
                  Anfitrión
                </div>
              </li>
              <li>
                <Link href="/dashboard/properties"
                  className={`flex items-center px-4 py-2 text-sm ${
                    isActive('/dashboard/properties')
                      ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <Building2 className="h-4 w-4 mr-3" />
                  Mis propiedades
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reservations"
                  className={`flex items-center px-4 py-2 text-sm ${
                    isActive('/dashboard/reservations')
                      ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <Calendar className="h-4 w-4 mr-3" />
                  Reservas recibidas
                </Link>
              </li>
            </>
          )}

          {/* Opciones para USER */}
          {userRole === 'USER' && (
            <>
              <li className="pt-2">
                <div className="px-4 py-1 text-xs text-gray-400 uppercase font-semibold tracking-wider">
                  Viajes
                </div>
              </li>
              <li>
                <Link href="/dashboard/bookings"
                  className={`flex items-center px-4 py-2 text-sm ${
                    isActive('/dashboard/bookings')
                      ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <Calendar className="h-4 w-4 mr-3" />
                  Mis reservas
                </Link>
              </li>
            </>
          )}

          {/* Opciones para ADMIN */}
          {userRole === 'ADMIN' && (
            <>
              <li className="pt-2">
                <div className="px-4 py-1 text-xs text-gray-400 uppercase font-semibold tracking-wider">
                  Administración
                </div>
              </li>
              <li>
                <Link href="/dashboard/admin/users"
                  className={`flex items-center px-4 py-2 text-sm ${
                    isActive('/dashboard/admin/users')
                      ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <User className="h-4 w-4 mr-3" />
                  Usuarios
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/properties"
                  className={`flex items-center px-4 py-2 text-sm ${
                    isActive('/dashboard/admin/properties')
                      ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <Building2 className="h-4 w-4 mr-3" />
                  Propiedades
                </Link>
              </li>
            </>
          )}

          {/* Footer del menú */}
          <li className="pt-4 mt-4 border-t border-gray-200">
            <Link href="/dashboard/settings"
              className={`flex items-center px-4 py-2 text-sm ${
                isActive('/dashboard/settings')
                  ? 'text-vacacional-salvia bg-vacacional-crema/30 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
              <Settings className="h-4 w-4 mr-3" />
              Configuración
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
