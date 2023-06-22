// require('dotenv').config();
const { Recipe } = require("../../db");
// const db = require('../utils/examples/db') // In case the spoonacular API is down


const createRecipe = async (req, res) => {
    try {

        // Validate diets
        const { diets } = req.body;
        if (!diets || !diets.length) {
            const message = `Diets ids are missing`
            return res
                .status(404)
                .send({ message })
        }

        // Create recipe in the database
        const { name, image, summary, healthScore, steps } = req.body;
        const [recipe, created] = await Recipe
            .findOrCreate({
                where: { name, image, summary, healthScore },
                defaults: { steps }
            })

        // Send 200, if it already created
        if (!created) {
            const data = recipe
            return res
                .status(200)
                .json({ data, created })
        }

        // *********** * Add associated diets * ************** 
        try {
            await recipe.addDiets(diets)
            const data = recipe
            res
                .status(200)
                .json({ data, created })

        } catch (error) {
            // Handle failing associating diets
            await Recipe.destroy({
                where: { id: recipe.id }
            })
            throw Error(error.message)
        }

    } catch (error) {
        const message = `Error finding or creating recipe: ${error.message}`
        res
            .status(500)
            .send({ message })
    }
}

module.exports = createRecipe;