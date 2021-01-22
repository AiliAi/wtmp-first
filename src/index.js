const data = [
  { name: "Lingonberry jam", price: 4.0 },
  { name: "Mushroom and bean casserole", price: 5.5 },
  { name: "Chili-flavoured wheat", price: 3.0 },
  { name: "Vegetarian soup", price: 4.8 },
  { name: "Pureed root vegetable soup with smoked cheese", price: 8.0 },
];

/**
 * 1.Function validate meal name based on regex rules
 *
 * @param {string} mealName
 * @return boolean - name is valid
 */
const validateMealName = (mealName) => {
  const namePattern = /^[A-ZÖÄÅ]{1}[a-zöäåA-ZÖÄÅ0-9\-\ \/,()]{3,63}$/;
  return namePattern.test(mealName);
};
//console.log('Meal name is valid:', validateMealName("Lingonberry jam"));

for (const item of Object.values(data)) {
  console.log('Mealname' + item.name + 'is valid: ', validateMealName(item.name));
};


/**
 * 2. Sort
 *
 * @param {Array} menu
 */
const sortMenu = menu => {
  const sortedMenu = menu.sort((a, b) => a.price - b.price);
  return sortedMenu;
};
console.log('sorted menu', sortMenu(data));


/**
 * 3. Filter meals from menu by price limit
 */
const filterMealsByPriceLimit = (menu, priceLimit) => {
  /*menu.filter((item) => {
    item.price < price;});*/
  return menu.filter(item => item.price < priceLimit);
};
console.log('filtered menu', filterMealsByPriceLimit(data, 5));

/**
 * 4. Raise all meal prices by precentage
 *
 * @param {Array} menu
 * @param {number} procent
 * @returns array
 */
const raisePricesByProcent = (menu, procent) => {
  return menu.map(item => {
    return {
      name: item.name,
      price: item.price * (1 + procent/100)
    };
    });
};
console.log('price raised:', raisePricesByProcent(data, 15));

/**
 * 5.Calculate total price for a menu array
 *
 * @param {Array} menu
 */
const calculateMenuTotalPrice = (menu) => {
  return menu.reduce((a, b) => {
    return {price: a.price + b.price};
  });
};
console.log('total cost', calculateMenuTotalPrice(data));


//B
import FazerMenu from './assets/fazer.json';
console.log('FazerMenu', FazerMenu);

/**
 * Choose vegetarian meal names from a menu data array
 *
 * @param {Object} menuData
 */
const selectVegeMeals = (menuData) => {
  let vegeMeals = [];
  console.log(menuData.LunchMenus[0].SetMenus);
  for (const setMenu of menuData.LunchMenus[0].SetMenus) {
    console.log(setMenu);
    for (const meal of setMenu.Meals) {
      console.log(meal);
      if (meal.Diets.includes('Veg')) {
        vegeMeals.push(meal.Name);
      }
    };
  }

  return vegeMeals;
};
console.log('test vege meal function', selectVegeMeals(FazerMenu));


//render a menu
const renderMenu = menu => {
  const list = document.querySelector(".restorant");
  list.innerHTML = "";
  for (const item of menu) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + ", " + item.price + " €";
    list.appendChild(listItem);
  }
};

/*sort by name
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
});*/
