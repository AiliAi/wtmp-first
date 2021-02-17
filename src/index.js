import SodexoData from './modules/sodexo-data.js';
import FazerData from './modules/fazer-data.js';
import {fetchGetJson} from './modules/network';
import { Sortable } from '@shopify/draggable';
import './assets/modernizr-custom.js';

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

const themeGreen = document.getElementById("theme-green");
const themeBlue = document.getElementById("theme-blue");
let languageSetting = "fi";
//console.log('index faze', FazerData.getDailyMenu(languageSetting));

let language = document.querySelector(".language");
language.innerHTML = "EN";
let random = document.querySelector(".random");
random.innerHTML = "satunnainen";

/**
 * Sets theme color to localStorage and changes the theme color for screen.
 *
 * @param {String} theme
 */
const setTheme = (theme) => {
  if (theme === 'Green') {
    localStorage.setItem('panelTheme', theme);
    document.documentElement.style.setProperty('--light-gray', '#9BADBF');
    document.documentElement.style.setProperty('--green-nav', '#77D786');
    console.log('theme changed to Green');
  }
  else if (theme === 'Blue') {
    localStorage.setItem('panelTheme', theme);
    document.documentElement.style.setProperty('--light-gray', '#b4d0d8');
    document.documentElement.style.setProperty('--green-nav', '#77c1d7');
    console.log('theme changed to Blue');
  }
};

//checkes if user has theme color in localStorage
let themeColor = localStorage.getItem('panelTheme');
if (localStorage.getItem('panelTheme') == ''){
  setTheme('Green');
} else {
  setTheme(themeColor);
}

//event listeners for theme color buttons
themeGreen.addEventListener("click", () => {
  setTheme('Green');
});
themeBlue.addEventListener("click", () => {
  setTheme('Blue');
});

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
    themeGreen.innerHTML = 'theme green';
    themeBlue.innerHTML = 'theme blue';
    languageSetting = "en";
    fazerLang = FazerData.weeklyUrlEn;
  } else {
    language.innerHTML = "EN";
    random.innerHTML = "satunnainen";
    themeGreen.innerHTML= 'theme vihreä';
    themeBlue.innerHTML = 'theme sininen';
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

/*let test = document.querySelector(":root");
test.style.setProperty('--light-gray', '#cccccc');*/
//menu.style.filter = 'brightness(0.6)';

  const navMenu = () => {
    if (menu.style.display === "block") {
      if (window.innerWidth <= 730) {
      menu.style.display = "none";
      navContainer.style.backgroundColor = "var(--green-nav)";
      } else {
      menu.style.display = "none";
      navContainer.style.backgroundColor = "var(--light-gray)";
      }
    } else {
        menu.style.display = "block";
        if (window.innerWidth <= 910) {
          navContainer.style.backgroundColor = "var(--green-nav)";
        }
    }
  };

navMenuIcon.addEventListener("click", navMenu);

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 730) {
    menu.style.display = "none";
    navContainer.style.backgroundColor = "var(--green-nav)";
  } else if (window.innerWidth <= 910){
    menu.style.display = "none";
    navContainer.style.backgroundColor = "var(--light-gray)";
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
    navMenuIcon.style.color= "var(--brown)";
    menu.style.borderBottom = "3px solid var(--dark-gray)";
  } else {
    menu.style.display = "block";
    navMenuIcon.style.display='none';
    menu.style.borderBottom = "none";
  }
}

function WidthChange2(mediaQuery2) {
  if (mediaQuery2.matches) {
    menu.style.borderBottom = "3px solid var(--dark-gray)";
    menu.style.display = "none";
    navMenuIcon.style.display='inline';
    navContainer.style.backgroundColor = "var(--green-nav)";
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
    menu.style.borderBottom = "none";
    navMenuIcon.style.display='inline';
    navContainer.style.backgroundColor = "var(--light-gray)";
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

/*
const modalButton = document.getElementById('week-list-sodexo');
const modal = document.querySelector('modal');
modalButton.addEventListener('click', () => {
  modal.style.display='block';
});*/

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.addEventListener ('click', () => {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener ('click', () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener ('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});









