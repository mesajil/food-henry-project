require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
    getRecipes: async (req, res) => {
        try {
            // Get number param
            let { number } = req.query;

            // Set default number = 100
            number ??= 100

            // Get recipes
            const { data: { results: recipes } } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&number=${number}`)

            // Reply recipes
            res.status(200).json({ data: recipes })

        } catch (error) {
            // Reply error
            res.status(404).send({ error: error.message })
        }
    },
    getRecipeInformationById: async (req, res) => {
        try {
            // Validate id param
            const { id } = req.params;
            if (!id) throw new Error("Recipe id is missing")

            // Get recipe information
            const { data: recipe } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)

            // Send recipe information
            res.status(200).json({ data: recipe })

        } catch (error) {
            // Reply error
            res.status(404).send({ error: error.message })
        }
    }
}