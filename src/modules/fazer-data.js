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
    console.log('meal name', meal.Name);
    }
  }
};

parseFazerMenuFi(LunchmenuFazerFi);

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
      console.log('meal name', meal.Name);
      i++;
    }
  }
};

parseFazerMenuEn(LunchmenuFazerEn);

const FazerData = {coursesEn, coursesFi};

export default FazerData;
