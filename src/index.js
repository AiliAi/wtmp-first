import SodexoData from './modules/sodexo-data.js';
import FazerData from './modules/fazer-data.js';

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
console.log('index faze', FazerData.getDailyMenu(languageSetting));

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
const switchLanguage = () => {
  if (languageSetting === "fi") {
    language.innerHTML = "FI";
    random.innerHTML = "pick a dish";
    languageSetting = "en";
  } else {
    language.innerHTML = "EN";
    random.innerHTML = "satunnainen";
    languageSetting = "fi";
  }
  renderMenu(SodexoData.getDailyMenu(languageSetting), 'sodexo');
  renderMenu(FazerData.getDailyMenu(languageSetting), 'fazer');
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

/**
 * Eventhandler for sort menu button
 */
let order = 'asc';
const renderSortedMenu = () => {
  renderMenu(sortMenu(SodexoData.getDailyMenu(languageSetting), order), 'sodexo');
  renderMenu(sortMenu(FazerData.getDailyMenu(languageSetting), order), 'fazer');
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

const displayRandomDish = () => {
  alert(pickRandomDish(SodexoData.getDailyMenu(languageSetting)));
};


const init = () => {
  document
    .querySelector("#switch-lang")
    .addEventListener("click", switchLanguage);
  document
    .querySelector("#sort-menu")
    .addEventListener("click", renderSortedMenu);
  document
    .querySelector("#pick-dish")
    .addEventListener("click", displayRandomDish);
    renderMenu(SodexoData.getDailyMenu(languageSetting), 'sodexo');
    renderMenu(FazerData.getDailyMenu(languageSetting), 'fazer');
  //TODO: render fazer data on page (use fazer-data.js module)
};
init();

















//nav opening and closing
const navMenuIcon = document.querySelector(".hamburger");
const menu = document.getElementById("menu");

  const navMenu = () => {
    if (menu.style.display === "block") {
      menu.style.display = "none";
      //navMenuIcon.style.backgroundColor = "";
    } else {
      menu.style.display = "block";
      //navMenuIcon.style.backgroundColor = "#87C789";
    }
  };

  navMenuIcon.addEventListener("click", navMenu);

  let banner = document.querySelector(".banner");
  let intro = document.querySelector(".intro");



window.addEventListener("scroll", () => {
  if (window.innerWidth <= 910) {
    menu.style.display = "none";
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


// media query change 1: change "Lisää kuva" -> "+"
function WidthChange(mediaQuery1) {

  if (mediaQuery1.matches) {
    menu.style.display = "none";
    navMenuIcon.style.display='inline';
  } else {
    menu.style.display = "block";
    navMenuIcon.style.display='none';
  }
}

function WidthChange2(mediaQuery2) {

  if (mediaQuery2.matches) {
    menu.style.display = "none";
    navMenuIcon.style.display='inline';
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
    navMenuIcon.style.display='block';
    banner.innerHTML = `
    <div class="banner-left">
    <p>LOUNARI.</p>
    <p>Missä tänään syötäisiin?</p>
    </div>
    <div class="banner-right"><img src="assets/food.jpg" alt="" /></div>`;

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





