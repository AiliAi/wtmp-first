const today = new Date().toISOString().split('T')[0];
const dailyUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`;

/**
 * Parses couse arrays from Sodexo json file
 *
 * @param {Object} sodexoDailyMenu in json format
 * @returns {Object} parsed menu arrays
 *
 */
const parseSodexoMenu = (sodexoDailyMenu) => {
  const coursesEn = [];
  const coursesFi = [];
  const courses = Object.values(sodexoDailyMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
  return {fi: coursesFi, en: coursesEn};
};

const getDailyMenu = (menuData, lang, dayOfWeek = 0) => {
  const parsedMenu = parseSodexoMenu(menuData.courses);
  return (lang === 'fi') ? parsedMenu.fi : parsedMenu.en;
};

const SodexoData = {getDailyMenu, dailyUrl};

export default SodexoData;
