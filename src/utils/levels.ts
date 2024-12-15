export const LEVELS = [
  'جديد',
  'مبتدئ',
  'متقدم',
  'ممتاز',
  'منافس',
  'المتميز',
  'المرتل',
  'القارئ',
  'الماهر',
  'الحافظ',
  'الخاتم',
  'الفائز'
] as const;

export const POINTS_PER_LEVEL = {
  'جديد': 0,
  'مبتدئ': 1,
  'متقدم': 100,
  'ممتاز': 200,
  'منافس': 400,
  'المتميز': 600,
  'المرتل': 1000,
  'القارئ': 1200,
  'الماهر': 1400,
  'الحافظ': 1700,
  'الخاتم': 1900,
  'الفائز': 2000
} as const;

export const getNextLevel = (points: number) => {
  const currentLevelIndex = LEVELS.findIndex(level => points < POINTS_PER_LEVEL[level]);
  
  if (currentLevelIndex === -1) {
    return null;
  }

  const nextLevel = LEVELS[currentLevelIndex];
  return {
    name: nextLevel,
    pointsNeeded: POINTS_PER_LEVEL[nextLevel] - points
  };
};