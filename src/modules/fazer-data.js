/**
 * Functions for managing Fazer menu data
 *
 * TODO:
 * -import fazer json
 * -export module in correct form
 * -use module/data in index.js
 */
import LunchmenuFazerFi from "../assets/fazer-menu-fi.json";
console.log("lunch menu Fazer Fi", LunchmenuFazerFi);
import LunchmenuFazerEn from "../assets/fazer-menu-en.json";
console.log("lunch menu Fazer En", LunchmenuFazerEn);

let coursesEn = [];
let coursesFi = [];
let vegeMealsEn = [];
let vegeMealsFi = [];

/**
 * Return a daily menu array from Fazer weekly json data
 *
 * @param {Object} menuData
 * @param {Numero} dayOfWeek week day 0-6
 * @returns {Array} daily menu
 */
const parseDailyMenu = (menuData, dayOfWeek) => {
  let dailyMenu = menuData.LunchMenus[dayOfWeek].SetMenus.map(setMenu => {
    let mealName = setMenu.Name;
    let dishes = setMenu.Meals.map(dish => {
      return `${dish.Name} (${dish.Diets.join(', ')})`;
    });
    return mealName ? mealName + dishes.join(', ') : dishes.join(', ') ;
  });

  return dailyMenu;
};

const getDailyMenu = (lang, dayOfWeek = 0) => {
  return (lang === 'fi') ?
  parseDailyMenu(LunchmenuFazerFi, dayOfWeek)
   :
  parseDailyMenu(LunchmenuFazerEn, dayOfWeek);
};
console.log('debug', getDailyMenu('en'));


const FazerData = {getDailyMenu};

export default FazerData;
