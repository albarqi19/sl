export interface Student {
  id: string;
  name: string;
  points: number;
  level: string;
  className?: string;
  rank?: number;
  violations?: string[];
  nextLevel?: string;
  pointsNeeded?: number;
}

export interface StudentContext {
  nextLevel: {
    name: string;
    pointsNeeded: number;
  } | null;
  nearbyStudents: {
    above: Student | null;
    below: Student | null;
  };
}