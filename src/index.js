const coursesEn = [
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
];

const restorant1 = document.querySelector(".restorants-list").childNodes[0];
const language = document.querySelector(".language");
const arrange = document.querySelector(".arrange");
const random = document.querySelector(".random");

//constant data
language.innerHTML = "EN";
for (const list of coursesFi) {
  restorant1.innerHTML += list + "<br>";
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

arrange.addEventListener("click", () => {
  if (language.innerHTML == "FI") {
    if (sorted == "desc") {
      arrangeList("desc", coursesEn);
      sorted = "asc";
    } else {
      arrangeList("asc", coursesEn);
      sorted = "desc";
    }
  } else {
    if (sorted == "desc") {
      arrangeList("desc", coursesFi);
      sorted = "asc";
    } else {
      arrangeList("asc", coursesFi);
      sorted = "desc";
    }
  }
});

//change language
const changeLanguage = () => {
  restorant1.innerHTML = "";
  if (language.innerHTML == "FI") {
    language.innerHTML = "EN";
    for (const list of coursesFi) {
      restorant1.innerHTML += list + "<br>";
    }
  } else {
    language.innerHTML = "FI";
    for (const list of coursesEn) {
      restorant1.innerHTML += list + "<br>";
    }
  }
};

language.addEventListener("click", changeLanguage);

//get random food from array
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const randomFood = () => {
  if (language.innerHTML == "EN") {
    let randomNumber = getRandomIntInclusive(0, coursesFi.length - 1);
    restorant1.innerHTML = coursesFi[randomNumber];
  } else {
    let randomNumber = getRandomIntInclusive(0, coursesEn.length - 1);
    restorant1.innerHTML = coursesEn[randomNumber];
  }
};

random.addEventListener("click", randomFood);
