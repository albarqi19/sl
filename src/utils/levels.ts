export const LEVELS = [
  'المبتدئ',
  'القارئ',
  'الحافظ',
  'المجود',
  'المتقن',
  'الماهر'
] as const;

export const POINTS_PER_LEVEL = {
  'المبتدئ': 0,
  'القارئ': 100,
  'الحافظ': 300,
  'المجود': 500,
  'المتقن': 800,
  'الماهر': 1000
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