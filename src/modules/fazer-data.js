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


/**
 * Parses course arrays from Fazer Fi json file
 *
 * @param {Object} menuData
 */
const parseFazerMenuFi = (menuData) => {
  console.log(menuData.LunchMenus[0].SetMenus);
  for (const setMenu of menuData.LunchMenus[0].SetMenus) {
    console.log(setMenu);
    for (const meal of setMenu.Meals) {
    console.log(meal);
    coursesFi.push(meal.Name);
    if (meal.Diets.includes('Veg')) {
      vegeMealsFi.push(meal.Name);
    }
    console.log('meal name', meal.Name);
    }
  }
};

//parseFazerMenuFi(LunchmenuFazerFi);


/**
 * Parses course arrays from Fazer En json file
 *
 * @param {Object} menuData
 */
let i = 0;
const parseFazerMenuEn = (menuData) => {
  console.log(menuData.LunchMenus[0].SetMenus);
  for (const setMenu of menuData.LunchMenus[0].SetMenus) {
    console.log(setMenu);
    for (const meal of setMenu.Meals) {
      console.log(meal);
      if (i < 13) {
        coursesEn.push(meal.Name);
      }
      if (meal.Diets.includes('Veg')) {
        vegeMealsEn.push(meal.Name);
      }
      console.log('meal name', meal.Name);
      i++;
    }
  }
};

//parseFazerMenuEn(LunchmenuFazerEn);


//const FazerData = {coursesEn, coursesFi, vegeMealsEn, vegeMealsFi};

//export default FazerData;

const FazerData = {getDailyMenu};

export default FazerData;
