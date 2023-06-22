// require('dotenv').config();
const { API_KEY } = process.env;
const mapRecipeFromAPI = require('./mapRecipeFromAPI.utils')
const axios = require('axios')

const getRecipeByIdFromAPI = async function (id) {

    try {
        // Get recipe by id
        console.log({ id });
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        const { data } = await axios.get(url)
        const recipe = mapRecipeFromAPI(data)
        return { data: recipe, message: "" }

    } catch (error) {
        const message = `Error fetching recipe by id from spoonacular api: ${error.message}`
        return { message }
    }

}
module.exports = getRecipeByIdFromAPI;