require('dotenv').config();
const axios = require('axios');
const { Recipe } = require('../db');
const { API_KEY } = process.env;


module.exports = {
    mapRecipe: function (recipe) {
        return {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions,
            diets: recipe.diets,
        }
    },
    getRecipesFromAPI: async function (
        numberRecipes = 100,
        addRecipeInformation = true
    ) {
        try {
            // Get recipes
            const { data: { results: recipes } } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&number=${numberRecipes}&addRecipeInformation=${addRecipeInformation}`)

            // Return recipes
            return recipes.map((recipe) => this.mapRecipe(recipe))
        } catch (error) {
            // Return error
            return {
                error: error.message
            }
        }
    },
    getRecipeByIdFromAPI: async function (id) {

        try {
            // Get recipe by id
            const { data: recipe } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            
            // Map and return recipe 
            return {
                data: this.mapRecipe(recipe)
            }
        } catch (error) {
            return {
                error: error.message
            }
        }

    },
    getRecipes: async function () {
        try {
            return [
                ...(await this.getRecipesFromAPI()),
                ...(await Recipe.findAll())
            ]
        } catch (error) {
            // Return error
            return {
                error: error.message
            }
        }
    },
    getHealthScoreDataFromAPI: async function () {
        try {
            
        } catch (error) {
            
        }
    }
}