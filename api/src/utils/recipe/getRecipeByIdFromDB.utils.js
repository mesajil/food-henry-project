
const { Recipe, Diet } = require('../../db')

const getRecipeByIdFromDB = async function (id) {

    try {
        const recipe = await Recipe.findByPk(id, {
            include: [
                {
                    model: Diet,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            ]
        })
        // Map recipe
        const mpaRecipe = {
            ...recipe.toJSON(),
            diets: recipe.diets.map(({ name }) => name)
        }
        return { data: mpaRecipe, message: "" };
    } catch (error) {
        const message = `Error fetching recipe by id from Database: ${error.message}`
        return { message }
    }
}


module.exports = getRecipeByIdFromDB;