import Link from "next/link";
import { Search, Menu } from "lucide-react";
import Button from "../ui/button";

export function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Alojamientos</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden flex-1 items-center justify-center px-6 lg:flex lg:max-w-2xl">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar alojamientos..."
                className="w-full rounded-full border bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden lg:flex">
            Publicar alojamiento
          </Button>
          <Button variant="ghost" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/login">
            <Button variant="ghost">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
