const getRecipes = require('../../utils/recipe/getRecipes.utils')
const filterRecipesByName = require('../../utils/recipe/filterRecipesByName.utils')


const getRecipesByNameController = async (req, res) => {
    try {
        // Get recipes
        let { data: recipes, message } = await getRecipes()

        if (!recipes || !recipes.length) {
            return res
                .status(404)
                .json({ data: recipes, message })
        }

        // Filter recipes
        const { name } = req.query;
        const data = filterRecipesByName(recipes, name)
        res
            .status(200)
            .json({ data, message })

    } catch (error) {
        const message = `Error getting recipes by name: ${error.message}`
        res
            .status(500)
            .json({ message })
    }
}

module.exports = getRecipesByNameController