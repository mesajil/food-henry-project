const getRecipeByIdFromAPI = require('../../utils/recipe/getRecipeByIdFromAPI.utils')

const getRecipeByIdFromAPIController = async (req, res) => {
    try {
        // Validate id param
        const { id } = req.params;
        if (!id) {
            const message = "Recipe id is missing"
            res
                .status(404)
                .send({ message })
        }

        // Get recipe 
        const { data, message } = await getRecipeByIdFromAPI(id)
        if (!data) throw Error(message)

        // Send recipe information
        res
            .status(200)
            .json({ data, message: "" })

    } catch (error) {
        const message = `Error fetching Recipe by Id from API: ${error.message}`
        res
            .status(500)
            .send({ message })
    }
}

module.exports = getRecipeByIdFromAPIController;