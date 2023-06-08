const { Diet } = require('../db')
const utils = require('../utils/diet.utils')

module.exports = {
    getDietNamesFromAPI: async (req, res) => {
        try {
            // Get diets from API
            let diets = await utils.getDietNamesFromAPI()

            // Send diets
            res.status(200).json({
                data: diets,
            })
        } catch (error) {
            // Reply error
            res.status(404).send({
                error: error.message
            })
        }
    },
    getDietsFromDB: async (req, res) => {
        try {
            // Get diets from database
            let diets = await utils.getDietsFromDB()

            // Send diets
            res.status(200).json({
                data: diets,
            })
        } catch (error) {
            // Reply error
            res.status(404).send({
                error: error.message
            })
        }
    },
    getDiets: async (req, res) => {
        try {
            // Get diets from database
            const diets = await utils.getDiets()

            // Send diets
            res.status(200).json({
                data: diets,
            })
        } catch (error) {
            // Reply error
            res.status(404).send({
                error: error.message
            })
        }
    },
}