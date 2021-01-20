const data = [
  { name: "Lingonberry jam", price: 4.0 },
  { name: "Mushroom and bean casserole", price: 5.5 },
  { name: "Chili-flavoured wheat", price: 3.0 },
  { name: "Vegetarian soup", price: 4.8 },
  { name: "Pureed root vegetable soup with smoked cheese", price: 8.0 },
];

//create buttons
const menu = document.querySelector(".small-menu");
const btnVal = document.createElement("button");
btnVal.textContent = "validate";
menu.appendChild(btnVal);

const btnSort = document.createElement("button");
btnSort.textContent = "sort";
menu.appendChild(btnSort);

const btnFilter = document.createElement("button");
btnFilter.textContent = "filter";
menu.appendChild(btnFilter);

const btnMap = document.createElement("button");
btnMap.textContent = "map";
menu.appendChild(btnMap);

const btnReduce = document.createElement("button");
btnReduce.textContent = "Reduce";
menu.appendChild(btnReduce);

//validate the name
const validateName = menu => {
  const regexpPattern = new RegExp('/^[A-ZÖÄÅ]{1}[a-zöäå][0-9][" ", ",", "-", "/", "(", ")"]{4,64}$/m');
  let res = true;
  for (const item of menu) {
    if (!regexpPattern.test(item)) {
      console.log(`Wont Match '${regexpPattern}'`);
      res = false;
    }
    return res;
  };
};
console.log(validateName(data));

//render a menu
const renderMenu = (menu) => {
  const list = document.querySelector(".restorant");
  list.innerHTML = "";
  for (const item of menu) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + ", " + item.price + " €";
    list.appendChild(listItem);
  }
};

//Always first sort by name
data.sort(function (a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
});

//sort by value when pressed button
const sortMenu = (menu) => {
  menu.sort((a, b) => {
    return a.price - b.price;
  });
  renderMenu(data);
};

//filter
function filteredByprice(item) {
  if (item.price < 5) {
    return item;
  }
}

let filterMenu = (menu) => {
  let ArrByPrice = menu.filter(filteredByprice);
  renderMenu(ArrByPrice);
};

//map
const mapByPrice = item => {
  let newPrice = item * 1.15;
  let rounded = Number(Math.round(newPrice+'e'+2)+'e-'+2);
    return rounded;
  };

const mapMenu = data.map(item => {
  const container = {};
  container.name = item.name;
  container.price = mapByPrice(item.price);
  return container;
});

//Reduce
const reduceMenu = data.reduce(function (acc, obj) { return acc + obj.price; }, 0);
console.log(reduceMenu);

//init
const init = () => {
  btnVal.addEventListener("click", () => {
    window.alert(validateName(data));
  });
  btnSort.addEventListener("click", () => {
    sortMenu(data);
  });
  btnFilter.addEventListener("click", () => {
    filterMenu(data);
  });
  btnMap.addEventListener("click", () => {
    renderMenu(mapMenu);
  });
  btnReduce.addEventListener("click", () => {
    window.alert(reduceMenu);
  });
  renderMenu(data);
};
init();
