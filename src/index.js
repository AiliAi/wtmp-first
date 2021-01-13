/*const coursesEn = [
  "Hamburger, cream sauce and poiled potates",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloum burger and french fries",
];

const coursesFi = [
  "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "vegaani Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lunch baguette with BBQ-turkey filling",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset",
];*/

/*import LunchMenu from '<./LunchMenu.json>';
// Test
console.log('lunch menu object', LunchMenu);*/

data = {
  "meta": {
    "generated_timestamp": 1578929916,
    "ref_url": "https://www.sodexo.fi/ravintolat/helsinki/metropolia-leiritie",
    "ref_title": "Metropolia Leiritie"
  },
  "courses": {
    "1": {
      "title_fi": "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
      "title_en": "Hamburger, cream sauce and poiled potates",
      "category": "Kotiruoka",
      "properties": "L",
      "price": "2,60 € / 5,10 € / 6,75 €"
    },
    "2": {
      "title_fi": "Goalaista kalacurrya ja täysjyväriisiä",
      "title_en": "Goan style fish curry and whole grain rice",
      "category": "Kotiruoka 2",
      "properties": "G, M",
      "price": "2,60 € / 5,10 € / 6,75 €"
    },
    "3": {
      "title_fi": "vegaani Chili sin carne ja täysjyväriisi",
      "title_en": "Vegan Chili sin carne and whole grain rice",
      "category": "Vegaani",
      "properties": "G, M",
      "price": "2,60 € / 5,10 € / 6,75 €"
    },
    "4": {
      "title_fi": "Parsakeittoa,lisäkesalaatti kahdella napaksella",
      "title_en": "Broccoli puree soup, side salad with two napas",
      "category": "Kasviskeitto",
      "properties": "L",
      "price": "2,60 € / 5,10 € / 6,75 €"
    },
    "5": {
      "title_fi": "Lounaspatonki bbq-kalkkunatäytteellä",
      "title_en": "Lunch baguette with BBQ-turkey filling",
      "category": "Leipälounas",
      "properties": "M",
      "price": "2,60 € / 5,10 € / 6,75 €"
    },
    "6": {
      "title_fi": "Sitruuna-salmiakkirahkaa",
      "title_en": "Lemon and salty liguorice quark",
      "category": "Jälkiruoka",
      "properties": "G, L",
      "price": "0,55 € / 0,65 € / 0,75 €"
    },
    "7": {
      "title_fi": "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset ",
      "title_en": "Cheese / Chicken / Vege / Halloum burger and french fries",
      "category": "Grilli 1",
      "properties": "VL",
      "price": "4,05 € / 6,10 € / 7,85 €"
    },
    "8": {
      "title_fi": "Makkaraperunat",
      "title_en": "Sausage and chips",
      "category": "Grilli 3",
      "properties": "G, M",
      "price": "4,05 € / 6,10 € / 7,85 €"
    },
    "9": {
      "title_fi": "Kasvismakkaraperunat",
      "title_en": "Vegetarian sausage and chips",
      "category": "Grilli 4",
      "properties": "M",
      "price": "4,05 € / 6,10 € / 7,85 €"
    }
  }
};

//test json
console.log(data);
console.log(data.courses[1].title_fi);
console.log(Object.keys(data.courses).length);

const menuLength = Object.keys(data.courses).length;



const restorant1 = document.querySelector(".restorants-list").childNodes[0];
const language = document.querySelector(".language");
const arrange = document.querySelector(".arrange");
const random = document.querySelector(".random");

//constant data
language.innerHTML = "EN";

//create array for sorting
let menuInFinnish = [];
let menuInEnglish= [];
for(let i = 1; i <= menuLength; i++) {
  restorant1.innerHTML += data.courses[i].title_fi + "<br>";
  menuInFinnish.push(data.courses[i].title_fi);
  menuInEnglish.push(data.courses[i].title_en);
}

/*
//sort the array version1
let sorted = false;
arrange.addEventListener("click", () => {
  restorant1.innerHTML = "";

  //sort desc
  if (sorted == false) {
    coursesEn.sort();
    coursesFi.sort();
    sorted = true;
  //sort asc
  } else {
    coursesEn.reverse();
    coursesFi.reverse();
    sorted = false;
  }

  //print the sorted array
  if (language.innerHTML == "FI") {
    for (const list of coursesEn) {
      restorant1.innerHTML += list + "<br>";
    }
  } else {
    for (const list of coursesFi) {
      restorant1.innerHTML += list + "<br>";
    }
  }
});*/

//sort the array version2
let sorted = "asc";
const arrangeList = (sorted, arr) => {
  restorant1.innerHTML = "";
  if (sorted == "desc") {
    arr.sort();
    arr.reverse();
  } else {
    arr.sort();
  }
  for (const list of arr) {
    restorant1.innerHTML += list + "<br>";
  }
};

//event listener for sorting the array
arrange.addEventListener("click", () => {
  if (language.innerHTML == "FI") {
    if (sorted == "desc") {
      arrangeList("desc", menuInEnglish);
      sorted = "asc";
    } else {
      arrangeList("asc", menuInEnglish);
      sorted = "desc";
    }
  } else {
    if (sorted == "desc") {
      arrangeList("desc", menuInFinnish);
      sorted = "asc";
    } else {
      arrangeList("asc", menuInFinnish);
      sorted = "desc";
    }
  }
});

//change language
const changeLanguage = () => {
  restorant1.innerHTML = "";
  if (language.innerHTML == "FI") {
    language.innerHTML = "EN";
    for(let i = 1; i <= menuLength; i++) {
      restorant1.innerHTML += data.courses[i].title_fi + "<br>";
    }
  } else {
    language.innerHTML = "FI";
    for(let i = 1; i <= menuLength; i++) {
      restorant1.innerHTML += data.courses[i].title_en + "<br>";
    }
  }
};

language.addEventListener("click", changeLanguage);

//get random food from array
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const randomFood = () => {
  let randomNumber = getRandomIntInclusive(1, menuLength);
  if (language.innerHTML == "EN") {
    restorant1.innerHTML = data.courses[randomNumber].title_fi;
  } else {
    restorant1.innerHTML = data.courses[randomNumber].title_en;
  }
};

random.addEventListener("click", randomFood);
