import { LucideIcon } from "lucide-react";

// Interfaces para tipos
export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface ActionItem {
  label: string;
  href: string;
  icon: LucideIcon;
  color: string;
  description: string;
}
