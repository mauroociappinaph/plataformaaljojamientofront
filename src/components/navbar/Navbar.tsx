"use client";
import Link from "next/link";
import { Search, Menu, Globe, User } from "lucide-react";
import Button from "../ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbar } from "@/hooks/useNavbar";

export function Navbar() {
  const { isScrolled, isAtTop, showMenu, toggleMenu } = useNavbar();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 w-full z-50 will-change-transform transition-colors duration-300 ${
        isAtTop ? 'bg-transparent' : 'bg-white'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={`w-full will-change-[height,box-shadow] ${
          isAtTop ? '' : 'border-b border-gray-200'
        }`}
        animate={{
          height: isScrolled ? 64 : 80,
          boxShadow: isAtTop
            ? "none"
            : (isScrolled
                ? "0 2px 8px rgba(0, 0, 0, 0.08)"
                : "0 1px 2px rgba(0, 0, 0, 0.02)")
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          restDelta: 0.001
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div layout="position">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                className={`font-bold will-change-[font-size] ${
                  isAtTop ? 'text-white' : 'text-vacacional-salvia'
                }`}
                animate={{
                  fontSize: isScrolled ? "1.1rem" : "1.25rem"
                }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                Alojamientos
              </motion.span>
            </Link>
          </motion.div>

          {/* Barra de búsqueda central tipo Airbnb - Optimizada */}
          <motion.div
            layout="position"
            className={`hidden lg:flex items-center justify-center rounded-full border border-gray-200 shadow-sm divide-x will-change-transform ${
              isAtTop ? 'bg-white/90 backdrop-blur-sm' : 'bg-white'
            }`}
            animate={{
              scale: isScrolled ? 0.95 : 1,
              y: isScrolled ? -2 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 26,
              restDelta: 0.001
            }}
          >
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <div className="text-xs font-medium">Lugar</div>
              <div className="text-sm text-gray-500">Explorar destinos</div>
            </div>

            {/* Contenedor para check-in/check-out con animación optimizada */}
            <motion.div
              className="flex overflow-hidden"
              initial={false}
              animate={{ width: isScrolled ? 0 : "auto" }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                restDelta: 0.001
              }}
            >
              {!isScrolled && (
                <>
                  <motion.div
                    key="check-in"
                    className="py-2 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xs font-medium whitespace-nowrap">Check-in</div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">¿Cuándo?</div>
                  </motion.div>

                  <motion.div
                    key="check-out"
                    className="py-2 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <div className="text-xs font-medium whitespace-nowrap">Check-out</div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">¿Cuándo?</div>
                  </motion.div>

                  <motion.div
                    key="travelers"
                    className="py-2 px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <div className="text-xs font-medium whitespace-nowrap">Viajeros</div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">¿Cuántos?</div>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Botón de búsqueda - Corregido */}
            <div className="ml-2 mr-1">
              <button
                className="bg-vacacional-salvia text-white p-3 rounded-full flex items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Botón de búsqueda móvil */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              className={`rounded-full p-2 shadow-sm ${
                isAtTop
                  ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  : 'border border-gray-200 text-vacacional-texto'
              }`}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Items - Corregidos */}
          <div className="flex items-center space-x-3">
            {/* Botón "Poné tu Alojamiento" - Fijo siempre visible en pantallas md+ */}


            {/* Icono Globe - Siempre visible */}
            <Button
              variant="ghost"
              className={`rounded-full p-2 transition-colors duration-200 ${
                isAtTop
                  ? 'text-white hover:bg-white/20'
                  : 'text-vacacional-texto hover:bg-vacacional-crema/40'
              }`}
            >
              <Globe className="h-5 w-5" />
            </Button>

            {/* Menú de usuario */}
            <div className="relative">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  isAtTop
                    ? 'bg-white/20 backdrop-blur-sm border-transparent'
                    : 'border border-gray-200'
                }`}
                onClick={toggleMenu}
              >
                <Menu className={`h-4 w-4 ${isAtTop ? 'text-white' : ''}`} />
                <User className={`h-6 w-6 ${isAtTop ? 'text-white' : 'text-gray-500'}`} />
              </Button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20
                    }}
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg"
                    style={{ transformOrigin: "top right" }}
                  >
                    <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-vacacional-crema/20 transition-colors duration-150">
                      Registrate
                    </Link>
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-vacacional-crema/20 transition-colors duration-150">
                      Iniciar sesión
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
