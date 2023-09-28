let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let result = document.getElementById("result");

submitButton.addEventListener("click", function () {
  const inputValue = inputField.value;
  if (inputValue == 0) {
    result.innerHTML = `<h1 style="color:red;
    font-size:25px;">Please Enter the dish name</h1>`;
  } else {
    fetch(url + inputValue)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strMealThumb);
        let instructions = [];
        let instruction = "";
        for (let i in myMeal.strInstructions) {
          if (myMeal.strInstructions[i] != ".") {
            instruction += myMeal.strInstructions[i];
          } else {
            if (instruction.length != 0 || instruction.length != 1) {
              instructions.push(instruction);
            }
            instruction = "";
          }
        }
        if (instruction.length != 0) {
          instructions.push(instruction);
        }
        console.log(instructions);
        let ullist = "";
        for (let i in instructions) {
          ullist += `<li>${instructions[i]}</li>`;
        }

        result.innerHTML = `
        <div class = "main-result">
          <img class ="recipe-img" src=${myMeal.strMealThumb} alt = "error">
          <div class = "details">
          <h3> Recipe - ${myMeal.strMeal}</h3>
          <h4> Country - ${myMeal.strArea}</h4>
          </div>
          <button id="viewbtn">View Recipe</button>
          <ul id="recipe-ul">
          ${ullist}
          </ul>
        <div>
        `;
        let recipeUl = document.getElementById("recipe-ul");
        let viewbtn = document.getElementById("viewbtn");
        viewbtn.addEventListener("click", function () {
          if (recipeUl.style.display === "none") {
            recipeUl.style.display = "block";
            viewbtn.textContent = "Close";
          } else {
            recipeUl.style.display = "none";
            viewbtn.textContent = "View Recipe";
          }
        });
      })
      .catch(
        (result.innerHTML = `<h4 style="color:red; font-size:25px;">Not found, Please search with other name <h4>`)
      );
  }
});
