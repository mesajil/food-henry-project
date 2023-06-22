const getRecipesFromAPI = require('../../utils/recipe/getRecipesFromAPI.utils')


const getRecipesFromAPIController = async (req, res) => {
    try {

        // Get recipes
        let { number } = req.query;
        const { data, message } = await getRecipesFromAPI(number)

        // Reply recipes
        res
            .status(200)
            .json({ data, message })

    } catch (error) {
        const message = `Error getting recipes from API: ${error.message}`
        res
            .status(500)
            .json({ data: [], message })
    }
}

module.exports = getRecipesFromAPIController;