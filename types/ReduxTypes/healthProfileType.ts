export interface HealthProfileT {
  userId?: string;
  weight?: number;
  height?: number;
  bmi?: number;
  diseases?: string[];
  disabilities?: string[];
  subdiseases?: string[];
  subdisabilities?: string[];
  targetWeight?: number;
  toningAreas?: string[];
  isPound?: boolean;
}