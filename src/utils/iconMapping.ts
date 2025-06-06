// src/utils/iconMapping.ts
import {
  AtomIcon,
  CalculatorIcon,
  ZapIcon,
  MoveIcon,
  TargetIcon,
  GaugeIcon,
  ArrowUpIcon,
  RotateCwIcon,
  SparklesIcon,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'Mathematics in Physics': CalculatorIcon,
  'Units and Dimensions': GaugeIcon,
  'Motion In One Dimension': ArrowUpIcon,
  'Motion In Two Dimensions': MoveIcon,
  'Laws of Motion': TargetIcon,
  'Electrostatics': ZapIcon,
  'Magnetic Effects of Current': RotateCwIcon,
  'Atomic Physics': AtomIcon,
  'Gravitation': TargetIcon,
  'Math in Physics': CalculatorIcon,
  'Centre of Mass Equilibrium and Momentum': TargetIcon,
  'Differential Equations': CalculatorIcon,
  'Vector Algebra': ArrowUpIcon,
  'Three Dimensional Geometry': MoveIcon,
  'Linear Programming': TargetIcon,
  'Probability': SparklesIcon,
};

export function getIconForChapter(chapterName: string): LucideIcon {
  return iconMap[chapterName] || AtomIcon;
}
