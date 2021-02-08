/**
 * Functions for managing Fazer menu data
 *
 */

import {fazerProxyUrl} from "../settings";

// TODO: Fix hard coded date, note that Karaportti is closed for now
const weeklyUrlEn = `${fazerProxyUrl}/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=2020-01-14`;
const weeklyUrlFi = `${fazerProxyUrl}/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2020-01-14`;

 /**
  * Returns a daily menu array from Fazer weekly json data
  * @param {Object} menuData
  * @param {Number} dayOfWeek week day 0-6
  * @returns {Array} daily menu
  */
 const parseDailyMenu = (menuData, dayOfWeek) => {

   let dailyMenu = menuData.LunchMenus[dayOfWeek].SetMenus.map(setMenu => {
     // console.log(setMenu);
     let mealName = setMenu.Name;
     let dishes = setMenu.Meals.map(dish => {
       return `${dish.Name} (${dish.Diets.join(', ')})`;
     });
     return mealName ? `${mealName}: ${dishes.join(', ')}` : dishes.join(', ');
   });
   return dailyMenu;
 };

 /**
  * TODO: design & implent multilang support (and update this comment)
  * @param {*} menuData
  * @param {*} lang
  * @param {*} dayOfWeek
  */
 const getDailyMenu = (menuData, lang, dayOfWeek = 1) => {
   // Fazer's index for Monday is 0, in JS it is 1
   dayOfWeek -= 1;
   if (dayOfWeek === -1) {
     dayOfWeek = 0;
   }
   console.log('parsing weekday #', dayOfWeek);
   return parseDailyMenu(menuData, dayOfWeek);
 };

 // console.log('debug fasu', getDailyMenu('fi'));

 const FazerData = {getDailyMenu, weeklyUrlFi, weeklyUrlEn};

 export default FazerData;
