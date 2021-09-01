const loadData = async () => {
  const searchField = document.getElementById("search-coktail");
  const searchText = searchField.value;

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();

  searchField.value = "";
  showSearchResults(data.drinks);
  // fetch(url).then(res => res.json()).then(data => console.log(data));
};

const showSearchResults = (coktails) => {
  const parentDiv = document.getElementById("coktail-parent");

  parentDiv.innerHTML = "";

  coktails.forEach((coktail) => {
    const div = document.createElement("div");
    div.classList.add("col");
    let { strDrink, strDrinkThumb, idDrink } = coktail;

    div.innerHTML = `
    <div onclick = "showDetail(${idDrink})" class="card">
      <img src="${strDrinkThumb}" class="card-img-top" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title">${strDrink}</h5>
      </div>
    </div>
    `;

    parentDiv.appendChild(div);
  });

  console.log(coktails);
};

const showDetail = async (coktailId) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${coktailId}`;

  const res = await fetch(url);
  const data = await res.json();

  const coktail = data.drinks[0];

  // destructuring properties

  let {strDrink, strDrinkThumb, strInstructions } = coktail;

  //list of Ingredients
  const ingredients = Object.keys(coktail).filter((prop) => prop.includes("strIngredient"));

  // console.log(ingredients);

  const parent = document.getElementById("coktail-detail-parent");

  parent.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("col");
  div.classList.add("text-center");

  div.innerHTML = `
  <img class="rounded-lg" style="border-radius:10px !important" src="${strDrinkThumb}"/>
  <h1>${strDrink}</h1>
  <div>
   <h3>Ingredients</h3>
   <hr>
   <ul id="list">
   </ul>
  </div>
  <h3>Preparation</h3>
  <hr>
  <p>${strInstructions}</p>
  `;


  parent.appendChild(div);

  //appending ingredients list

  const ul = document.getElementById("list");
  for (let i = 0; i < ingredients.length; i++) {

    // let ingredient = coktail.strIngredient+i;

    //accessing the ingredients text
    let ingredient = coktail[ingredients[i]];
    // console.log(ingredient);

    // console.log(li.innerText);

    if (ingredient !== null) {
      const li = document.createElement("li");
      li.innerText = ingredient;
      ul.appendChild(li);
    }else{
      continue;
    }

  }

  // console.log(data.drinks[0]);
};
