import SodexoData from './modules/sodexo-data.js';
import FazerData from './modules/fazer-data.js';
import {fetchGetJson} from './modules/network';
import { Sortable } from '@shopify/draggable';

const sortable = new Sortable(document.querySelectorAll('.restorants-list'), {
  draggable: '.restorant'
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

let languageSetting = "fi";
//console.log('index faze', FazerData.getDailyMenu(languageSetting));

let language = document.querySelector(".language");
language.innerHTML = "EN";
let random = document.querySelector(".random");
random.innerHTML = "satunnainen";

/**
 * Displays lunch menu items as html list
 *
 * @param {Array} menuData - Lunch menu array
 * @param {string} restaurant - element target id
 */
const renderMenu = (menuData, restaurant) => {
  const list = document.querySelector('#' + restaurant);
  list.innerHTML = '';
  for (const item of menuData) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Switch app lang en/fi
 */
let fazerLang = FazerData.weeklyUrlFi;
const switchLanguage = async () => {
  if (languageSetting === "fi") {
    language.innerHTML = "FI";
    random.innerHTML = "pick a dish";
    languageSetting = "en";
    fazerLang = FazerData.weeklyUrlEn;
  } else {
    language.innerHTML = "EN";
    random.innerHTML = "satunnainen";
    languageSetting = "fi";
    fazerLang = FazerData.weeklyUrlFi;
  }

  try {
    const dailyMenuJson = await fetchGetJson(SodexoData.dailyUrl);
    const parsedMenu = SodexoData.getDailyMenu(dailyMenuJson, languageSetting);
    renderMenu(parsedMenu, 'sodexo');
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }

  try {
    // TODO: add multilang support
    let weeklyMenuJson = await fetchGetJson(fazerLang, true);
    // Get number of the weekday (0: Sun, 1: Mon, etc.)
    const weekDay = new Date().getDay();
    const parsedMenu = FazerData.getDailyMenu(weeklyMenuJson, languageSetting, weekDay);
    renderMenu(parsedMenu, 'fazer');
    console.log(weeklyMenuJson);
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }
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

/**
 * Eventhandler for sort menu button
 */
let order = 'desc';
const renderSortedMenu = async () => {
  try {
    const dailyMenuJson = await fetchGetJson(SodexoData.dailyUrl);
    const parsedMenu = SodexoData.getDailyMenu(dailyMenuJson, languageSetting);
    renderMenu(sortMenu(parsedMenu, order), 'sodexo');
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }

  try {
    // TODO: add multilang support
    const weeklyMenuJson = await fetchGetJson(fazerLang, true);
    // Get number of the weekday (0: Sun, 1: Mon, etc.)
    const weekDay = new Date().getDay();
    const parsedMenu = FazerData.getDailyMenu(weeklyMenuJson, languageSetting, weekDay);
    renderMenu(sortMenu(parsedMenu, order), 'fazer');
    console.log(weeklyMenuJson);
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }

  if (order === 'asc'){
    order = 'desc';
  } else {
    order = 'asc';
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

const displayRandomDish = async () => {
  //alert(pickRandomDish(SodexoData.getDailyMenu(languageSetting)));
  try {
    const dailyMenuJson = await fetchGetJson(SodexoData.dailyUrl);
    const parsedMenu = SodexoData.getDailyMenu(dailyMenuJson, languageSetting);
    alert(pickRandomDish(parsedMenu));
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }
};


const init = async () => {
  document.querySelector('#switch-lang').addEventListener('click', switchLanguage);
  document.querySelector('#sort-menu').addEventListener('click', renderSortedMenu);
  document.querySelector('#pick-dish').addEventListener('click', displayRandomDish);

  try {
    const dailyMenuJson = await fetchGetJson(SodexoData.dailyUrl);
    const parsedMenu = SodexoData.getDailyMenu(dailyMenuJson, languageSetting);
    renderMenu(parsedMenu, 'sodexo');
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }

  try {
    // TODO: add multilang support
    const weeklyMenuJson = await fetchGetJson(FazerData.weeklyUrlFi, true);
    // Get number of the weekday (0: Sun, 1: Mon, etc.)
    const weekDay = new Date().getDay();
    const parsedMenu = FazerData.getDailyMenu(weeklyMenuJson, languageSetting, weekDay);
    renderMenu(parsedMenu, 'fazer');
    console.log(weeklyMenuJson);
  } catch (error) {
    console.error(error);
    // TODO: notify user ?
  }

};
init();

















//nav opening and closing
const navMenuIcon = document.querySelector(".hamburger");
const menu = document.getElementById("menu");
const navContainer = document.querySelector(".container-nav");
let banner = document.querySelector(".banner");
let intro = document.querySelector(".intro");
navMenuIcon.textContent = '☰';


  const navMenu = () => {
    if (menu.style.display === "block") {
      if (window.innerWidth <= 730) {
      menu.style.display = "none";
      navContainer.style.backgroundColor = "#77D786";
      } else {
      menu.style.display = "none";
      navContainer.style.backgroundColor = "#9BADBF";
      }
    } else {
        menu.style.display = "block";
        if (window.innerWidth <= 910) {
          navContainer.style.backgroundColor = "#77D786";
        }
    }
  };

navMenuIcon.addEventListener("click", navMenu);

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 730) {
    menu.style.display = "none";
    navContainer.style.backgroundColor = "#77D786";
  } else if (window.innerWidth <= 910){
    menu.style.display = "none";
    navContainer.style.backgroundColor = "#9BADBF";
  } else {
    menu.style.display = "block";
  }
});

  //Change "nav menu" -> "hamburger"
if (matchMedia) {
  const mediaQuery1 = window.matchMedia("(max-width: 910px)");
  mediaQuery1.addListener(WidthChange);
  WidthChange(mediaQuery1);
  const mediaQuery2 = window.matchMedia("(max-width: 730px)");
  mediaQuery2.addListener(WidthChange2);
  WidthChange2(mediaQuery2);
}


function WidthChange(mediaQuery1) {
  if (mediaQuery1.matches) {
    menu.style.display = "none";
    navMenuIcon.style.display='inline';
    navMenuIcon.style.color= "#940E3F";
  } else {
    menu.style.display = "block";
    navMenuIcon.style.display='none';
  }
}

function WidthChange2(mediaQuery2) {
  if (mediaQuery2.matches) {
    menu.style.display = "none";
    navMenuIcon.style.display='inline';
    navContainer.style.backgroundColor = "#77D786";
    intro.innerHTML = '';
    banner.innerHTML = `
    <section class="intro bc-color">
    <h1>LOUNARI.
    </h1>
    <p>
       Missä tänään syötäisiin? Tuttu tarina ennen lounashetkeä.
    </p>
    <p>
      Palvelu etsii lähelläsi olevat lounaspaikat, sekä näyttää niiden päivittäisen lounaslistan.
    </p>
    </section>`;
  } else {
    navMenuIcon.style.display='inline';
    navContainer.style.backgroundColor = "#9BADBF";
    banner.innerHTML = `
    <div class="banner-left">
    <p>LOUNARI.</p>
    <p>Missä tänään syötäisiin?</p>
    </div>
    <div class="banner-right"><img src="assets/food-smaller.jpg" alt="" /></div>`;

    intro.innerHTML = `
    <p>
      Missä tänään syötäisiin? Tuttu tarina ennen lounashetkeä.
    </p>
    <p>
    Palvelu etsii lähelläsi olevat lounaspaikat, sekä näyttää niiden päivittäisen lounaslistan.
    Viikottaiset lounaslistat ovat myös käytettävissäsi. Pääset niihin klikkaamalla ravintolan logoa.
    </p>`;
  }
}





