require('dotenv').config();
const axios = require('axios');
const { Diet } = require('../db')
const { ERR_GET_DIET_NAMES_FROM_API } = require('../utils/error')
const { API_KEY } = process.env;
const recipeUtils = require("./recipe.utils")


module.exports = {
    getDietNamesFromAPI: async () => {
        try {
            // Get 100 recipes from spoonacular API 
            const { data: recipes } = await recipeUtils.getRecipesFromAPI()

            if (!recipes) throw Error('Error fetching recipes from API')
            // Get diets
            let names = new Set();
            recipes.forEach(recipe => {
                names = new Set([...names, ...recipe.diets])
            });

            // Return diet names
            return { data: Array.from(names) }
        } catch (error) {
            return { message: ERR_GET_DIET_NAMES_FROM_API(error.message) }
        }
    },
    mapDiet: (diet) => {
        return { id: diet.id, name: diet.name }
    },
}