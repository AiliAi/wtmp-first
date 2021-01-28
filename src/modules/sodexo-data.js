import Lunchmenu from "../assets/sodexo-menu.json";
console.log("lunch menu json", Lunchmenu);

let coursesEn = [];
let coursesFi = [];

/**
 * Parses couse arrays from Sodexo json file
 *
 * @param {Object} sodexoDailyMenu
 */
const parseSodexoMenu = (sodexoDailyMenu) => {
  const courses = Object.values(sodexoDailyMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};

parseSodexoMenu(Lunchmenu.courses);

const getDailyMenu = (lang, dayOfWeek = 0) => {
  return (lang === 'fi') ? coursesFi : coursesEn;
};

const SodexoData = {getDailyMenu};


export default SodexoData;
