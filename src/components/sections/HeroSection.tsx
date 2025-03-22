"use client"
import { Search, MapPin, Calendar, Users, Award, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from "../ui/Button/Button";
import { useHeroSection } from "@/hooks/useHeroSection";

export function HeroSection() {
  const {
    searchQuery,
    setSearchQuery,
    guests,
    setGuests,
    showMobileSearch,
    toggleMobileSearch,
    containerAnimation,
    itemAnimation
  } = useHeroSection();

  return (
    <section className="relative min-h-[90vh] pt-16 flex items-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto max-w-7xl w-full px-4 py-8 sm:py-16 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
        >
          <motion.div
            className="inline-block mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs sm:text-sm font-medium"
            variants={itemAnimation}
          >
            <span className="flex items-center">
              <Award size={16} className="mr-1.5 sm:mr-2 text-amber-400" />
              Experiencias únicas respaldadas por nuestros usuarios
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl mb-4 sm:mb-6"
            variants={itemAnimation}
          >
            Encuentra el lugar perfecto para tus vacaciones
          </motion.h1>

          <motion.p
            className="mt-3 text-base sm:text-lg md:text-xl text-white/90"
            variants={itemAnimation}
          >
            Explora alojamientos únicos en todo el mundo y vive experiencias inolvidables
          </motion.p>

          {/* Buscador para pantallas medianas y grandes */}
          <motion.div
            className="mt-8 sm:mt-10 bg-white p-3 sm:p-4 rounded-xl shadow-xl max-w-3xl mx-auto hidden sm:block"
            variants={itemAnimation}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative col-span-1 md:col-span-2">
                <MapPin className="absolute left-3 top-3 text-vacacional-texto" size={18} />
                <input
                  type="text"
                  placeholder="¿A dónde quieres ir?"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-vacacional-texto" size={18} />
                <input
                  type="text"
                  placeholder="Fechas"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3 text-vacacional-texto" size={18} />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia appearance-none bg-white"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Huésped' : 'Huéspedes'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button className="px-8 py-3 text-base">
                <Search className="mr-2" size={18} />
                Buscar alojamientos
              </Button>
            </div>
          </motion.div>

          {/* Buscador compacto para móviles */}
          <motion.div className="mt-8 sm:hidden" variants={itemAnimation}>
            <div
              className="bg-white/90 backdrop-blur-md rounded-full py-3 px-4 flex items-center justify-between shadow-lg cursor-pointer"
              onClick={toggleMobileSearch}
            >
              <div className="flex items-center text-vacacional-texto">
                <Search size={18} className="mr-2" />
                <span className="text-sm font-medium">¿Dónde quieres ir?</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-vacacional-texto transition-transform duration-300 ${showMobileSearch ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Panel de búsqueda expandible para móviles */}
            <motion.div
              className="mt-2 bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showMobileSearch ? 'auto' : 0,
                opacity: showMobileSearch ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-vacacional-texto" size={18} />
                  <input
                    type="text"
                    placeholder="¿A dónde quieres ir?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-vacacional-texto" size={18} />
                  <input
                    type="text"
                    placeholder="Fechas"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-3 text-vacacional-texto" size={18} />
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-vacacional-salvia appearance-none bg-white"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Huésped' : 'Huéspedes'}</option>
                    ))}
                  </select>
                </div>

                <Button className="w-full py-3">
                  <Search className="mr-2" size={18} />
                  Buscar alojamientos
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Estadísticas para pantallas medianas y grandes */}
          <motion.div
            className="mt-10 sm:mt-12 hidden sm:grid grid-cols-3 gap-3 sm:gap-4 text-white"
            variants={itemAnimation}
          >
            <div className="p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl sm:text-3xl">10k+</div>
              <div className="text-xs sm:text-sm">Alojamientos</div>
            </div>
            <div className="p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl sm:text-3xl">8k+</div>
              <div className="text-xs sm:text-sm">Usuarios</div>
            </div>
            <div className="p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-2xl sm:text-3xl">500+</div>
              <div className="text-xs sm:text-sm">Destinos</div>
            </div>
          </motion.div>

          {/* Estadísticas más compactas para móviles */}
          <motion.div
            className="mt-8 sm:hidden flex justify-center gap-3 text-white"
            variants={itemAnimation}
          >
            <div className="px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-xl">10k+</div>
              <div className="text-xs">Alojamientos</div>
            </div>
            <div className="px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-xl">8k+</div>
              <div className="text-xs">Usuarios</div>
            </div>
            <div className="px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-xl">500+</div>
              <div className="text-xs">Destinos</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
          <path d="M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
}
