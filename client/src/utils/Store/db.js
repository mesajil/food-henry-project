const ceviche = {
    name: "ceviche",
    image: "https://spoonacular.com/recipeImages/782601-312x231.jpg",
    diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
}


// Create recipes
const recipes = [...Array(9).keys()].map((id) => ({ ...ceviche, id }))
const diets = [
    {
        "id": 1,
        "name": "gluten free"
    },
    {
        "id": 2,
        "name": "dairy free"
    },
    {
        "id": 3,
        "name": "lacto ovo vegetarian"
    },
    {
        "id": 4,
        "name": "vegan"
    },
    {
        "id": 5,
        "name": "paleolithic"
    },
    {
        "id": 6,
        "name": "primal"
    },
    {
        "id": 7,
        "name": "whole 30"
    },
    {
        "id": 8,
        "name": "pescatarian"
    },
    {
        "id": 9,
        "name": "ketogenic"
    },
    {
        "id": 10,
        "name": "fodmap friendly"
    }
]

// Export data
export { recipes, diets };