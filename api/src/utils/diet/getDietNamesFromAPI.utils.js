const getRecipesFromAPI = require("../recipe/getRecipesFromAPI.utils")
const getDietNamesFromRecipes = require("./getDietNamesFromRecipes.utils")

const getDietNamesFromAPI = async () => {
    try {
        // Get 100 recipes from spoonacular API 
        const { data: recipes, message } = await getRecipesFromAPI()
        if (!recipes.length) throw Error(message)
        const dietNames = getDietNamesFromRecipes(recipes)
        return { data: dietNames, message: "" }

    } catch (error) {
        const message = `Error fetching diet names from spoonacular API: ${error.message}`
        return { data: [], message }
    }
}

module.exports = getDietNamesFromAPI;