// src/utils/iconMapping.ts
import { 
  AtomIcon, 
  // FlaskIcon, 
  CalculatorIcon,
  ZapIcon,
  MoveIcon,
  TargetIcon,
  GaugeIcon,
  ArrowUpIcon,
  RotateCwIcon,
  SparklesIcon
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  'Mathematics in Physics': CalculatorIcon,
  'Units and Dimensions': GaugeIcon,
  'Motion In One Dimension': ArrowUpIcon,
  'Motion In Two Dimensions': MoveIcon,
  'Laws of Motion': TargetIcon,
  // 'Mechanical Properties of Fluids': FlaskIcon,
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
  // 'p Block Elements (Group 15, 16, 17 & 18)': FlaskIcon,
  // 'd and f Block Elements': AtomIcon,
  // 'Coordination Compounds': FlaskIcon,
  // 'Haloalkanes and Haloarenes': FlaskIcon,
  // 'Alcohols Phenols and Ethers': FlaskIcon,
};

export function getIconForChapter(chapterName: string) {
  return iconMap[chapterName] || AtomIcon;
}