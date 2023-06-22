const getRecipesFromAPI = require('./getRecipesFromAPI.utils')
const getRecipesFromDB = require('./getRecipesFromDB.utils')


const getRecipes = async function () {
    try {
        // Get recipes from API
        const errors = [];
        let recipes = [];
        const { data: apiRecipes, message: apiMessage } = await getRecipesFromAPI();
        errors.push(apiMessage)
        recipes.push(...apiRecipes)

        // Get recipes from Database
        const { data: dbRecipes, message: dbMessage } = await getRecipesFromDB();
        errors.push(dbMessage)
        recipes.push(...dbRecipes)
        
        // Handle missing recipes
        const message = errors.join(', ')
        if (!recipes.length) {
            throw Error(message)
        }

        return { data: recipes, message }

    } catch (error) {
        const message = `Error fetching recipes: ${error.message}`
        return { data: [], message }
    }
}

module.exports = getRecipes;