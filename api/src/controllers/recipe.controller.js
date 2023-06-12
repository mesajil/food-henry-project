require('dotenv').config();
const recipeUtils = require('../utils/recipe.utils')
const { Recipe } = require("../db");


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
                return res.status(404).send({
                    error: "Diets are missing"
                })

            // Save recipe object
            const [recipe, created] = await Recipe.findOrCreate({
                where: {
                    name: req.body.name,
                    image: req.body.image,
                    summary: req.body.summary,
                    healthScore: req.body.healthScore,
                },
                defaults: {
                    steps: req.body.steps
                }
            })

            // Add associated diets
            try {
                await recipe.addDiets(diets)
                // Send recipe
                res.status(200).json({
                    data: recipe,
                    created,
                })
            } catch (error) {
                // Destroy recipe
                await Recipe.destroy({
                    where: {
                        id: recipe.id
                    }
                })
                // Send error
                res.status(404).send({
                    error: error.message
                })
            }

        } catch (error) {
            // Reply error
            res.status(500).send({
                error: error.message
            })
        }
    },
    getRecipeById: async (req, res) => {
        try {
            // Validate recipe id
            const { idRecipe: id } = req.params;
            if (!id)
                return res.status(404).send({
                    error: "Recipe id is missing"
                })

            try { // ****** * DATABASE * *********

                // Try to get recipe from database
                const recipe = await Recipe.findByPk(id)

                // If recipe is missing, try to get from the API
                if (!recipe) throw new Error("Recipe not found")

                // Send recipe
                return res.status(200).json({
                    data: recipe
                })
            } catch (error) { // ****** * API * *********
                // Try to get recipe from API
                const {
                    data: recipe,
                    error: APIerror
                } = await recipeUtils.getRecipeByIdFromAPI(id)

                // If recipe is missing, send an error
                if (!recipe)
                    return res.status(404).send({
                        error: {
                            databaseError: error.message,
                            APIerror
                        }
                    })

                // Send the recipe
                return res.status(200).json({
                    data: recipe
                })
            }

        } catch (error) {
            // Reply error
            res.status(500).send({
                error: error.message
            })
        }
    },
    getRecipeByName: async (req, res) => {
        try {
            // Get recipes
            const recipes = await recipeUtils.getRecipes()

            // Get query name
            const { name } = req.query;

            // Send recipes
            if (!name)
                return res.status(200).send({
                    data: recipes
                })

            // Filter the recipes by name
            const data = recipes.filter((recipe) => {
                return recipe.name.toLowerCase().includes(
                    name.toLowerCase()
                )
            })

            // Send filter recipes
            res.status(200).send({
                data,
                message: !data.length ? "No recipes found" : ""
            })

        } catch (error) {
            // Reply error
            res.status(500).send({
                error: error.message
            })
        }
    },
    getHealthScoreDataFromAPI: async (req, res) => {
        try {
            res.send('Hello')
        } catch (error) {
            
        }
    }
}