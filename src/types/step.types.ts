import { ReactNode } from 'react';

/**
 * Interfaz para los elementos de paso a paso en procesos visuales
 * Utilizada en secciones como "Cómo funciona" y otros flujos de proceso
 */
export interface Step {
  /** Identificador único del paso */
  id: number;

  /** Título descriptivo del paso */
  title: string;

  /** Descripción detallada del paso o funcionalidad */
  description: string;

  /** Icono representativo del paso (componente React) */
  icon: ReactNode;
}

/**
 * Tipos de procesos predefinidos para mantener consistencia en la aplicación
 */
export enum StepProcessType {
  BOOKING = 'booking',
  VERIFICATION = 'verification',
  AI_ASSISTANT = 'ai_assistant',
}

/**
 * Configuración de un proceso visual completo
 */
export interface StepProcess {
  /** Tipo de proceso */
  type: StepProcessType;

  /** Título del proceso */
  title: string;

  /** Descripción opcional del proceso */
  description?: string;

  /** Pasos que componen el proceso */
  steps: Step[];
}
