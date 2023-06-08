const { Recipe } = require('../db')
const { API_KEY } = process.env;

module.exports = {
    getRecipeById: async (req, res) => {
        try {
            const { id } = req.params;
        } catch (error) {
            
        }
    },
    getRecipesByNameMatch: () => {},
    createRecipe: () => {},
}