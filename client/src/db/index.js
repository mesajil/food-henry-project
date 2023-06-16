const ceviche = {
    name: "ceviche",
    image: "https://spoonacular.com/recipeImages/782601-312x231.jpg",
    diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
}


// Create recipes
const recipes = [...Array(9).keys()].map((id) => ({ ...ceviche, id }))


// Export data
export default { recipes };

// Test
console.log(recipes);