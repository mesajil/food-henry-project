require('dotenv').config();
const axios = require('axios');
const { Diet } = require('../db')
const { API_KEY } = process.env;
const recipeUtils = require("./recipe.utils")


module.exports = {
    getDietNamesFromAPI: async () => {

        // Get recipes
        const numberRecipes = 100
        const recipes = await recipeUtils.getRecipesFromAPI(numberRecipes)

        // Get diets
        let dietNames = new Set();
        recipes.forEach(recipe => {
            dietNames = new Set([
                ...dietNames,
                ...recipe.diets
            ])
        });

        // Return diet names
        return Array.from(dietNames)
    },
    mapDiet: (diet) => {
        return {
            id: diet.id,
            name: diet.name,
        }
    },
}