require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
    getHelloMessage: (req, res) => {
        res.status(200).send('Hello World!')
    },
    getRecipeInformationById: async (req, res) => {
        try {
            // Validate id param
            const { id } = req.params;
            if (!id) throw new Error("Recipe id is missing")

            // Get recipe information
            const { data: recipe } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)

            // Send recipe information
            res.status(200).json(recipe)

        } catch (error) {
            // Reply error
            res.status(404).send(error.message)
        }
    }
}