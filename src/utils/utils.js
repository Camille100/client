/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
export const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const newDate = new Date(date);
  return newDate.toLocaleDateString('fr-FR', options);
};

export const calculateLvl = (xp) => {
  const xpObj = {
    level: 0,
    totalXp: xp,
    xpToLevelUp: 0,
    xpOfLevel: 0,
    percentOfLevel: 0,
  };
  if (xp < 150) {
    xpObj.level = 1;
    xpObj.xpToLevelUp = (150 - xp);
    xpObj.xpOfLevel = 150;
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / 150 * 100);
    return xpObj;
  }
  if (xp >= 150 && xp < 330) {
    xpObj.level = 2;
    xpObj.xpToLevelUp = (330 - xp);
    xpObj.xpOfLevel = (330 - 150);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (330 - 150) * 100);
    return xpObj;
  }
  if (xp >= 330 && xp < 550) {
    xpObj.level = 3;
    xpObj.xpToLevelUp = (550 - xp);
    xpObj.xpOfLevel = (550 - 330);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (550 - 330) * 100);
    return xpObj;
  }
  if (xp >= 550 && xp < 800) {
    xpObj.level = 4;
    xpObj.xpToLevelUp = (800 - xp);
    xpObj.xpOfLevel = (800 - 550);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (800 - 550) * 100);
    return xpObj;
  }
  if (xp >= 800 && xp < 1150) {
    xpObj.level = 5;
    xpObj.xpToLevelUp = (1150 - xp);
    xpObj.xpOfLevel = (1150 - 800);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (1150 - 800) * 100);
    return xpObj;
  }
  if (xp >= 1150 && xp < 1600) {
    xpObj.level = 6;
    xpObj.xpToLevelUp = (1600 - xp);
    xpObj.xpOfLevel = (1600 - 1150);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (1600 - 1150) * 100);
    return xpObj;
  }
  if (xp >= 1600 && xp < 2150) {
    xpObj.level = 7;
    xpObj.xpToLevelUp = (2150 - xp);
    xpObj.xpOfLevel = (2150 - 1600);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (2150 - 1600) * 100);
    return xpObj;
  }
  if (xp >= 2150 && xp < 2900) {
    xpObj.level = 8;
    xpObj.xpToLevelUp = (2900 - xp);
    xpObj.xpOfLevel = (2900 - 2150);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (2900 - 2150) * 100);
    return xpObj;
  }
  if (xp >= 2900 && xp < 3850) {
    xpObj.level = 9;
    xpObj.xpToLevelUp = (3850 - xp);
    xpObj.xpOfLevel = (3850 - 2900);
    xpObj.percentOfLevel = 100 - (xpObj.xpToLevelUp / (3850 - 2900) * 100);
    return xpObj;
  }
  if (xp >= 3850) {
    xpObj.level = 10;
    xpObj.xpToLevelUp = 0;
    xpObj.xpOfLevel = 0;
    xpObj.percentOfLevel = 100;
    return xpObj;
  }
  return xpObj;
};
