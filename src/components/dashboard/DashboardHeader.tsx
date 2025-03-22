'use client';

import { useAuth } from '@/hooks/useAuth';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface DashboardHeaderProps {
  toggleSidebar?: () => void;
}

export default function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Notificaciones de ejemplo
  const notifications = [
    { id: 1, message: 'Tienes una nueva reserva', read: false, time: '5m' },
    { id: 2, message: 'Tu propiedad ha sido verificada', read: true, time: '2h' },
    { id: 3, message: 'Actualización del sistema completada', read: true, time: '1d' },
  ];

  // Filtrar notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
      {/* Botón para toggle del sidebar en móvil */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Logo para móvil */}
      <div className="lg:hidden ml-2">
        <Link href="/" className="font-bold text-vacacional-salvia">
          Alojamientos
        </Link>
      </div>

      {/* Título de la página */}
      <div className="hidden lg:block text-xl font-bold text-gray-800">
        Dashboard
      </div>

      {/* Espacio flexible */}
      <div className="flex-1"></div>

      {/* Notificaciones */}
      <div className="relative mr-3">
        <button
          className="p-2 rounded-full relative hover:bg-gray-100"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} className="text-gray-600" />

          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown de notificaciones */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-sm font-medium">Notificaciones</h3>
              {unreadCount > 0 && (
                <button className="text-xs text-vacacional-salvia hover:underline">
                  Marcar todas como leídas
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex justify-between">
                        <p className={`text-sm ${!notification.read ? 'font-medium' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-600 text-center">
                  No tienes notificaciones
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-gray-100 text-center">
              <Link
                href="/dashboard/notifications"
                className="text-xs text-vacacional-salvia hover:underline"
              >
                Ver todas las notificaciones
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Perfil de usuario */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center space-x-2 hover:bg-gray-100 rounded-full pr-2 pl-1 py-1"
        >
          <div className="h-8 w-8 rounded-full bg-vacacional-salvia/20 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover rounded-full" />
            ) : (
              <span className="text-xs font-medium text-vacacional-salvia">
                {user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <ChevronDown size={16} className="text-gray-600" />
        </button>

        {/* Dropdown del usuario */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium truncate">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'usuario@example.com'}</p>
            </div>

            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Mi perfil
            </Link>

            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Configuración
            </Link>

            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
