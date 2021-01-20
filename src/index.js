/*import sayHello from "./moduls/test-moduls.js";
console.log(sayHello('Aili'));*/

/*import {sayHello} from "./moduls/test-moduls.js";
import {setting} from "./moduls/test-moduls.js";
console.log(sayHello('Aili'));
console.log('application lang:', setting.lang);*/


/*import myModule from './moduls/test-moduls.js';
console.log('application lang:', myModule.setting.lang);
console.log(myModule.sayHello('Aili'));*/

import Lunchmenu from "./assets/sodexo-menu.json";

console.log("lunch menu json", Lunchmenu);

let coursesEn = [];
let coursesFi = [];
let languageSetting = "fi";

let language = document.querySelector(".language");
language.innerHTML = "EN";
let random = document.querySelector(".random");
random.innerHTML = "satunnainen";

/**
 * Displays lunch menu items as html list
 *
 * @param {Array} menu - Lunch menu array
 */
const renderMenu = (menu) => {
  const list = document.querySelector("#sodexo");
  list.innerHTML = "";
  for (const item of menu) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Switch app lang en/fi
 */
const switchLanguage = () => {
  if (languageSetting === "fi") {
    language.innerHTML = "FI";
    random.innerHTML = "pick a dish";
    languageSetting = "en";
    renderMenu(coursesEn);
  } else {
    language.innerHTML = "EN";
    random.innerHTML = "satunnainen";
    languageSetting = "fi";
    renderMenu(coursesFi);
  }
  console.log("change language to: ", languageSetting);
};

/**
 * Sorts menu alphapetically
 *
 * @param {Array} menu
 * @param {string} order
 * @returns Sorted menu array
 */
const sortMenu = (menu, order) => {
  if (order == "desc") {
    return menu.sort().reverse();
  } else {
    return menu.sort();
  }
};

let ascEn = false;
let ascFi = false;
/**
 * Eventhandler for sort menu button
 */
const renderSortedMenu = () => {
  if (languageSetting === "en") {
    if (ascEn == false) {
      renderMenu(sortMenu(coursesEn, "asc"));
      ascEn = true;
    } else {
      renderMenu(sortMenu(coursesEn, "desc"));
      ascEn = false;
    }
  } else {
    if (ascFi == false) {
      renderMenu(sortMenu(coursesFi, "asc"));
      ascFi = true;
    } else {
      renderMenu(sortMenu(coursesFi, "desc"));
      ascFi = false;
    }
  }
};

/**
 * Picks a random dish from lunch menu array
 *
 * @param {Array} menu
 * @returns string dish name
 */
const pickRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

const displayRandomDish = () => {
  if (languageSetting === "fi") {
  alert(pickRandomDish(coursesFi));
  } else {
    alert(pickRandomDish(coursesEn));
  }
};

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

const init = () => {
  parseSodexoMenu(Lunchmenu.courses);
  document
    .querySelector("#switch-lang")
    .addEventListener("click", switchLanguage);
  document
    .querySelector("#sort-menu")
    .addEventListener("click", renderSortedMenu);
  document
    .querySelector("#pick-dish")
    .addEventListener("click", displayRandomDish);
  renderMenu(coursesFi);
};
init();
