require('dotenv').config();
const recipeUtils = require('../utils/recipe.utils')
const { filterRecipesByName } = require('../utils/utils')
const { Recipe } = require("../db");
const { ERR_GET_RECIPES_BY_NAME, ERR_RECIPE_ID_MISSING, ERR_MISSING_DIETS } = require('../utils/error');
const db = require('../utils/db') // In case the spoonacular API is down


module.exports = {
    getRecipesFromAPI: async (req, res) => {
        try {

            // Validate number of recipes
            let { number } = req.query;

            // Get recipes
            const recipes = await recipeUtils.getRecipesFromAPI(number)

            // Reply recipes
            res.status(200).json({
                data: recipes
            })

        } catch (error) {
            // Reply error
            res.status(404).send({
                error: error.message
            })
        }
    },
    getRecipeByIdFromAPI: async (req, res) => {
        try {
            // Validate id param
            const { id } = req.params;
            if (!id) throw new Error("Recipe id is missing")

            // Get recipe information
            const recipe = await recipeUtils.getRecipeByIdFromAPI(id)

            // Send recipe information
            res.status(200).json({
                data: recipe
            })

        } catch (error) {
            // Reply error
            res.status(404).send({
                error: error.message
            })
        }
    },
    createRecipe: async (req, res) => {
        try {

            // Validate diets
            const { diets } = req.body;
            if (!diets || !diets.length)
                return res.status(404).send({ message: ERR_MISSING_DIETS() })

            // Create recipe object
            const [recipe, created] = await Recipe.findOrCreate({
                where: {
                    name: req.body.name,
                    image: req.body.image,
                    summary: req.body.summary,
                    healthScore: req.body.healthScore,
                },
                defaults: { steps: req.body.steps }
            })

            // Add associated diets
            try {
                await recipe.addDiets(diets)
                // Success: send recipe
                res.status(200).json({ data: recipe, created })

            } catch (error) {
                // Fail associating diets: Destroy recipe
                await Recipe.destroy({
                    where: { id: recipe.id }
                })
                // Send error
                res.status(404).send({ message: error.message })
            }

        } catch (error) {
            // Reply error
            res.status(500).send({ message: error.message })
        }
    },
    getRecipeById: async (req, res) => {
        try {
            // Validate recipe id
            const { idRecipe: id } = req.params;
            if (!id) return res.status(404).send({ message: ERR_RECIPE_ID_MISSING() })

            try { // ****** * DATABASE * *********

                // Get recipe from database
                const recipe = await recipeUtils.getRecipeByIdFromDB(id)

                // Valid uuid, but recipe not found
                if (!recipe) throw new Error()

                // Send recipe
                return res.status(200).json({ data: recipe })

            } catch (error) { // ****** * API * *********
                // Get recipe from API
                const { data, message } = await recipeUtils.getRecipeByIdFromAPI(id)

                // Handle missing recipes
                if (!data) return res.status(404).send({ message })

                // Send the recipe
                return res.status(200).json({ data })
            }

        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    getRecipeByName: async (req, res) => {
        try {
            // Get recipes
            let { data: recipes } = await recipeUtils.getRecipes()

            if (!recipes) throw Error("No recipes found")

            // Send filter
            const { name } = req.query;
            res.status(200).json({ data: filterRecipesByName(recipes, name) })

        } catch (error) {
            res.status(500).json({ message: ERR_GET_RECIPES_BY_NAME(error.message) })
        }
    },
}