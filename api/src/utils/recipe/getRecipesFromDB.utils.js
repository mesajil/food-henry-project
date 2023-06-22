const { Recipe, Diet } = require('../../db')

const getRecipesFromDB = async function () {
    try {
        const recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attribute: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        const mapRecipes = recipes.map(recipe => ({
            ...recipe.toJSON(),
            diets: recipe.diets.map(({ name }) => name),
            created: true, // Fetching from Database
        }))
        return { data: mapRecipes, message: "" };

    } catch (error) {
        const message = `Error fetching recipes from Database: ${error.message}`
        return { data: [], message }
    }
}

module.exports = getRecipesFromDB;