require('dotenv').config();
const axios = require('axios');
const { ERR_FETCH_API, ERR_GET_RECIPES, ERR_GET_RECIPE_BY_ID_FROM_API } = require('../utils/error')
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const db = require('../utils/db') // In case the spoonacular API is down

module.exports = {
    recipeMap: function (recipe) {
        return {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions,
            diets: recipe.diets,
            created: false, // Fetch from the spoonacular API
        }
    },
    getRecipesFromAPI: async function (nRecipes = 100, addRecipeInfo = true) {
        try {
            // Get recipes
            const url = `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&number=${nRecipes}&addRecipeInformation=${addRecipeInfo}`
            const { data: { results: recipes } } = await axios.get(url)

            // Return recipes
            return { data: recipes.map((recipe) => this.recipeMap(recipe)) }
        } catch (error) {
            return { message: ERR_FETCH_API(error.message) }
        }
    },
    getRecipeByIdFromAPI: async function (id) {

        try {
            // Get recipe by id
            console.log({ id });
            const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            const { data: recipe } = await axios.get(url)

            // Map and return recipe 
            return { data: this.recipeMap(recipe) }
        } catch (error) {
            return { message: ERR_GET_RECIPE_BY_ID_FROM_API(error.message) }
        }

    },
    getRecipesFromDB: async function () {

        // const recipes = await Recipe.findAll()
        const recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attribute: ['name'],
                through: { attributes: [] }
            }
        });
        const formatted = recipes.map(recipe => ({
            ...recipe.toJSON(),
            diets: recipe.diets.map(({ name }) => name),
            created: true,
        }))

        return formatted;
    },
    getRecipes: async function () {
        try {
            // Get recipes from API and Database
            let { data: recipesFromAPI } = await this.getRecipesFromAPI();
            const recipesFromDB = await this.getRecipesFromDB();

            // if (!recipesFromAPI)
            //     recipesFromAPI = db.recipes; // In case the spoonacular API is down

            // Handle case: Error fetching from API
            if (!recipesFromAPI) {
                return { data: recipesFromDB };
            }

            return { data: [...recipesFromAPI, ...recipesFromDB] }

        } catch (error) {
            return { message: ERR_GET_RECIPES(error.message) }
        }
    },
    getRecipeByIdFromDB: async function (id) {

        const recipe = await Recipe.findByPk(id, {
            include: [
                {
                    model: Diet,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            ]
        })
        const diets = recipe.diets.map(({ name }) => name);
        return { ...recipe.toJSON(), diets };
    }
}