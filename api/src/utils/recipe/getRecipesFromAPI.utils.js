// require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const mapRecipeFromAPI = require('./mapRecipeFromAPI.utils')

const getRecipesFromAPI = async function (numRecipes = 100, addInfo = true) {
    try {
        // Get recipes
        // const url = `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&number=${numRecipes}&addRecipeInformation=${addInfo}`
        const url = `http://localhost:8080/recipes/complexSearch/?apiKey=${API_KEY}&number=${numRecipes}&addRecipeInformation=${addInfo}`
        console.log({url});
        const { data: { results: recipes } } = await axios.get(url)
        const mapRecipes = recipes.map((recipe) => mapRecipeFromAPI(recipe))
        return { data: mapRecipes, message: "" }
    } catch (error) {
        const message = `Error fetching recipes from spoonacular API: ${error.message}`
        return { data: [], message }
    }
}

module.exports = getRecipesFromAPI;