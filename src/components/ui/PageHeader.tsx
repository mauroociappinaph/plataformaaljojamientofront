import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

interface PageHeaderProps {
  /**
   * Título principal de la página
   */
  title: string;

  /**
   * Descripción opcional de la página
   */
  description?: string;

  /**
   * Migas de pan para la navegación
   */
  breadcrumbs?: Breadcrumb[];

  /**
   * Contenido adicional en la derecha
   */
  rightContent?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  rightContent
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Migas de pan */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {breadcrumb.active ? (
                  <span className="font-medium text-vacacional-texto">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="hover:text-vacacional-salvia transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-vacacional-texto">{title}</h1>
          {description && (
            <p className="mt-2 text-lg text-gray-600 max-w-3xl">{description}</p>
          )}
        </div>

        {rightContent && (
          <div className="ml-4">{rightContent}</div>
        )}
      </div>
    </div>
  );
}
