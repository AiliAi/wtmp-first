import LunchMenu from './assets/LunchMenu.json';
// Test
console.log('lunch menu object', LunchMenu);

let courseFi = [];
let courseEn = [];

let languageSetting = 'fi';

/**
 * Displays lunch menu items as html list
 *
 * @param {Array} menu - Lunch menu array
 */
const renderMenu = (menu) => {
  const list = document.querySelector('#sodexo');
  list.innerHTML = '';
  for (const item of menu) {
    const listitem = document.createElement('li');
    listitem.textContent = item;
    list.appendChild(listitem);
  }
};


/**
 * Switch app lang en/fi
 */
const switchLanguage = () => {
  if (languageSetting === 'fi'){
    languageSetting = 'en';
    renderMenu(coursesEn);
  } else {
    anguageSetting = 'fi';
    renderMenu(coursesFi);
  }
};

/**
 * Sorts menu alphapetically
 *
 * @param {Array} menu
 * @param {string} order
 * @returns Sorted menu Array
 */
const sortMenu = (menu, order) => {
  if (order == 'desc') {
    return menu.sort().reverse();
  } else {
    return menu.sort();
  }
};

/**
 * Eventhandler for sort menu button
 */
const renderSortMenu = () => {
  if (languageSetting === 'en') {
    renderMenu(sortMenu(courseEn, 'asc'));
  } else {
    renderMenu(sortMenu(courseFi, 'asc'));
  }
};

/**
 * Picks a random dish from lunch menu array
 *
 * @param {Array} menu
 * @returns string dish
 */
const pickRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random()* menu.length);
  //return menu[Math.floor(Math.random()* menu.length)];
  return menu[randomIndex];
};

const displayRandomDish = () => {
  if (languageSetting === 'en') {
    alert(pickRandomDish(courseEn));
  } else {
    alert(pickRandomDish(courseFi));
  }
};

/**
 * Parses course array from Sodexo json file
 *
 * @param {Object} sodexDayMenu
 */
const parseSodexMenu = (sodexDayMenu) => {
  const courses = Object.values(sodexDayMenu);
  for (const course of courses) {
    courseEn.push(course.title_en)
    courseFi.push(course.title_fi)
  }
}

const init = () => {
  parseSodexMenu(LunchMenu.courses);
  document.querySelector('#switch-lang').addEventListener('click', switchLanguage);
  document.querySelector('#sort-menu').addEventListener('click', renderSortMenu);
  document.querySelector('#pick-dish').addEventListener('click', displayRandomDish);
  renderMenu(courseFi);
};
init();

