
const getRecipeByIdFromDB = require('../../utils/recipe/getRecipeByIdFromDB.utils')
const getRecipeByIdFromAPI = require('../../utils/recipe/getRecipeByIdFromAPI.utils')

const getRecipeByIdController = async (req, res) => {
    try {
        // Validate recipe id
        const { idRecipe: id } = req.params;
        if (!id) {
            const message = `Missing id`
            return res
                .status(404)
                .send({ message })
        }

        try { // ****** * DATABASE * *********

            // Get recipe from database
            const { data: recipe, message } = await getRecipeByIdFromDB(id)

            // Valid uuid, but recipe not found
            if (!recipe) throw new Error(message)

            // Send recipe
            return res
                .status(200)
                .json({ data: recipe, message: "" })

        } catch (error) { // ****** * API * *********
            const errors = [error.message]

            // Get recipe from API
            const { data, message: apiMessage } = await getRecipeByIdFromAPI(id)

            // Handle missing recipes
            if (!data) {
                message = errors.concat(apiMessage).join(', ')
                return res
                    .status(404)
                    .send({ message })
            }

            // Send the recipe
            message = errors.join(', ')
            return res
                .status(200)
                .json({ data, message })
        }

    } catch (error) {
        const message = `Error getting recipe by Id: ${error.message}`
        res
            .status(500)
            .send({ message })
    }
}


module.exports = getRecipeByIdController;