# Plan de Migración de Componentes

## Problema Detectado

Hemos detectado un conflicto de nombres entre los archivos originales y los nuevos (por ejemplo, `button.tsx` vs `Button/Button.tsx`). Este conflicto es problemático en algunos sistemas operativos que no distinguen entre mayúsculas y minúsculas en nombres de archivos.

## Nueva Estrategia de Migración

### Fase 1: Preparación

1. ✅ Crear carpetas con nombres temporales para cada componente

   - `Button_new/`
   - `FormInput_new/`
   - etc.

2. ✅ Mover el código a los nuevos archivos en estas carpetas temporales
   - `Button_new/Button.tsx`
   - `FormInput_new/FormInput.tsx`
   - etc.

### Fase 2: Eliminación de Archivos Originales

1. Eliminar los archivos originales:
   - `button.tsx`
   - `FormInput.tsx`
   - etc.

### Fase 3: Renombrar Carpetas Temporales

1. Renombrar las carpetas temporales a sus nombres finales:
   - `Button_new/` → `Button/`
   - `FormInput_new/` → `FormInput/`
   - etc.

### Fase 4: Actualizar Importaciones

1. Actualizar el archivo barrel principal `index.ts`
2. Actualizar importaciones en todos los archivos que usan estos componentes

## Componentes a Migrar

- [ ] Button (`button.tsx` → `Button/Button.tsx`)
- [ ] FormInput (`FormInput.tsx` → `FormInput/FormInput.tsx`)
- [ ] PasswordStrengthIndicator
- [ ] ErrorMessage

## Consideraciones

- Cuidado con sistemas de archivos que no distinguen mayúsculas de minúsculas (macOS, Windows)
- Git distingue mayúsculas/minúsculas pero puede haber problemas según el sistema operativo
