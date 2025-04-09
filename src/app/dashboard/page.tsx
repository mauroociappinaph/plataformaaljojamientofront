'use client';

import { useAuth } from "@/hooks/useAuth";
import { Calendar, Building2, CreditCard, Star, TrendingUp, Users, Heart, Key } from "lucide-react";
import Link from "next/link";
import { StatItem, ActionItem } from "../../types/dashboardUser.types";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  // Establecer un tiempo máximo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocalLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Si estamos en estado de carga (pero no por demasiado tiempo)
  if ((isLoading || isLocalLoading) && user === null) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-vacacional-salvia mb-4"></div>
        <p className="text-gray-500">Cargando tu dashboard...</p>
      </div>
    );
  }

  // Usar datos de usuario por defecto para desarrollo si no hay usuario
  const currentUser = user || {
    id: "dev-user-id",
    name: "Usuario de Prueba",
    email: "test@example.com",
    role: "USER"
  };

  // Roles disponibles y sus respectivas estadísticas
  const userRole = currentUser.role || 'USER';

  // Determinar estadísticas y acciones rápidas según rol
  let stats: StatItem[] = [];
  let quickActions: ActionItem[] = [];

  // Estadísticas para HOST o ADMIN
  if (userRole === 'HOST' || userRole === 'ADMIN') {
    stats = [
      { label: 'Propiedades', value: '5', icon: Building2, color: 'bg-blue-100 text-blue-600' },
      { label: 'Reservas', value: '12', icon: Calendar, color: 'bg-green-100 text-green-600' },
      { label: 'Ingresos', value: '$2,450', icon: CreditCard, color: 'bg-purple-100 text-purple-600' },
      { label: 'Valoración', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
    ];

    quickActions = [
      {
        label: 'Añadir propiedad',
        href: '/properties/create',
        icon: Building2,
        color: 'bg-vacacional-crema text-vacacional-salvia',
        description: 'Publica un nuevo alojamiento'
      },
      {
        label: 'Ver reservas',
        href: '/dashboard/reservations',
        icon: Calendar,
        color: 'bg-blue-50 text-blue-600',
        description: 'Gestiona las reservas recibidas'
      },
      {
        label: 'Analíticas',
        href: '/dashboard/analytics',
        icon: TrendingUp,
        color: 'bg-green-50 text-green-600',
        description: 'Revisa el rendimiento'
      }
    ];
  }

  // Estadísticas para USER
  if (userRole === 'USER') {
    stats = [
      { label: 'Viajes', value: '3', icon: Building2, color: 'bg-blue-100 text-blue-600' },
      { label: 'Noches', value: '12', icon: Calendar, color: 'bg-green-100 text-green-600' },
      { label: 'Gasto', value: '$1,250', icon: CreditCard, color: 'bg-purple-100 text-purple-600' },
      { label: 'Favoritos', value: '8', icon: Heart, color: 'bg-red-100 text-red-600' },
    ];

    quickActions = [
      {
        label: 'Buscar alojamiento',
        href: '/properties',
        icon: Building2,
        color: 'bg-vacacional-crema text-vacacional-salvia',
        description: 'Encuentra tu próximo destino'
      },
      {
        label: 'Mis reservas',
        href: '/dashboard/bookings',
        icon: Calendar,
        color: 'bg-blue-50 text-blue-600',
        description: 'Gestiona tus viajes'
      },
      {
        label: 'Favoritos',
        href: '/dashboard/favorites',
        icon: Heart,
        color: 'bg-red-50 text-red-600',
        description: 'Tus alojamientos guardados'
      }
    ];
  }

  // Estadísticas para ADMIN
  if (userRole === 'ADMIN') {
    stats = [
      { label: 'Usuarios', value: '1,234', icon: Users, color: 'bg-indigo-100 text-indigo-600' },
      { label: 'Propiedades', value: '823', icon: Building2, color: 'bg-blue-100 text-blue-600' },
      { label: 'Reservas', value: '3,421', icon: Calendar, color: 'bg-green-100 text-green-600' },
      { label: 'Ingresos', value: '$142K', icon: CreditCard, color: 'bg-purple-100 text-purple-600' },
    ];

    quickActions = [
      {
        label: 'Gestionar usuarios',
        href: '/dashboard/admin/users',
        icon: Users,
        color: 'bg-indigo-50 text-indigo-600',
        description: 'Administra usuarios y roles'
      },
      {
        label: 'Verificar propiedades',
        href: '/dashboard/admin/properties',
        icon: Key,
        color: 'bg-amber-50 text-amber-600',
        description: 'Aprueba nuevos alojamientos'
      },
      {
        label: 'Métricas',
        href: '/dashboard/admin/analytics',
        icon: TrendingUp,
        color: 'bg-green-50 text-green-600',
        description: 'Analíticas de la plataforma'
      }
    ];
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">Bienvenido, {currentUser.name}</h1>
        <p className="text-gray-600">Accede a la gestión de tu cuenta y administra tus {userRole === 'HOST' ? 'propiedades' : 'reservas'}</p>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center">
              <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              href={action.href}
              key={index}
              className="block group border border-gray-200 rounded-lg hover:border-vacacional-salvia hover:shadow-md transition-all p-4"
            >
              <div className="flex items-start">
                <div className={`rounded-full p-3 mr-4 ${action.color}`}>
                  <action.icon size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-vacacional-salvia">{action.label}</p>
                  <p className="text-gray-500 text-sm mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Actividad reciente</h2>

        <div className="space-y-4">
          {userRole === 'HOST' && (
            <>
              <div className="flex items-start border-b border-gray-100 pb-4">
                <div className="bg-blue-50 text-blue-600 rounded-full p-2 mr-4">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Nueva reserva recibida</p>
                  <p className="text-xs text-gray-500 mt-1">Apartamento en Barcelona, del 15 al 20 de mayo</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-50 text-yellow-600 rounded-full p-2 mr-4">
                  <Star size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Nueva valoración recibida</p>
                  <p className="text-xs text-gray-500 mt-1">4 estrellas para Villa en Málaga</p>
                  <p className="text-xs text-gray-400 mt-1">Ayer</p>
                </div>
              </div>
            </>
          )}

          {userRole === 'USER' && (
            <>
              <div className="flex items-start border-b border-gray-100 pb-4">
                <div className="bg-green-50 text-green-600 rounded-full p-2 mr-4">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Próximo viaje</p>
                  <p className="text-xs text-gray-500 mt-1">Casa rural en Asturias, del 10 al 15 de junio</p>
                  <p className="text-xs text-gray-400 mt-1">En 15 días</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-50 text-red-600 rounded-full p-2 mr-4">
                  <Heart size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Propiedad añadida a favoritos</p>
                  <p className="text-xs text-gray-500 mt-1">Ático en Valencia</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 3 días</p>
                </div>
              </div>
            </>
          )}

          {userRole === 'ADMIN' && (
            <>
              <div className="flex items-start border-b border-gray-100 pb-4">
                <div className="bg-amber-50 text-amber-600 rounded-full p-2 mr-4">
                  <Building2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Nueva propiedad pendiente de verificación</p>
                  <p className="text-xs text-gray-500 mt-1">Chalet en Marbella</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 30 minutos</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-50 text-indigo-600 rounded-full p-2 mr-4">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">5 nuevos usuarios registrados</p>
                  <p className="text-xs text-gray-500 mt-1">3 huéspedes, 2 anfitriones</p>
                  <p className="text-xs text-gray-400 mt-1">Hoy</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
