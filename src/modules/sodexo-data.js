const today = new Date().toISOString().split('T')[0];
console.log(today);

const dailyUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`;

/**
 * Parses couse arrays from Sodexo json file
 *
 * @param {Object} sodexoDailyMenu in Json format
 * @returns {Object} parses menu arrays
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
  return {fi: coursesFi, en: courseEn};
};


const getDailyMenu = (menuData, lang, dayOfWeek = 0) => {
  const parseMenu =   parseSodexoMenu(menuData.courses);
  return (lang === 'fi') ? parseMenu.fi : parseMenu.en;
};

const SodexoData = {getDailyMenu, dailyUrl};


export default SodexoData;
