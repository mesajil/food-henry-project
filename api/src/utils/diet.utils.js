require('dotenv').config();
const axios = require('axios');
const { Diet } = require('../db')
const { API_KEY } = process.env;


module.exports = {
    getDietNamesFromAPI: async () => {
        // Set parameters
        const numberRecipes = 100
        const addRecipeInformation = true

        // Get recipes
        const { data: { results: recipes } } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&number=${numberRecipes}&addRecipeInformation=${addRecipeInformation}`)

        // Get diets
        let dietNames = new Set();
        recipes.forEach(recipe => {
            recipe.diets.forEach(diet => {
                dietNames.add(diet)
            });
        });

        // Return diet names
        return Array.from(dietNames)
    },
    getDietsFromDB: async () => {
        // Get diets from database
        const diets = await Diet.findAll()

        // Return diets
        return diets.map(({ id, name }) => ({ id, name }))
    },
    getDiets: async function() {
        // Get diets from database
        let diets = await this.getDietsFromDB()

        // Return diets
        if (diets.length) return diets

        // Get diet names from API
        const dietNames = await this.getDietNamesFromAPI()

        // Save diets in the database
        await Diet.bulkCreate(
            dietNames.map((name) => ({ name }))
        )

        // Return diets from database
        return await this.getDietsFromDB()

    },
}