const { Diet } = require('../db')
const dietUtils = require('../utils/diet.utils')
const db = require('../utils/db') // In case the spoonacular API is down

module.exports = {
    getDietNamesFromAPI: async (req, res) => {
        try {
            // Get diets from API
            let diets = await dietUtils.getDietNamesFromAPI()

            // Send diets
            res.status(200).json({
                data: diets,
            })
        } catch (error) {
            // Reply error
            res.status(500).send({
                error: error.message
            })
        }
    },
    getDietsFromDB: async (req, res) => {
        try {
            // Get diets from database
            let diets = await Diet.findAll()

            // Send diets
            res.status(200).json({
                data: diets.map(({ id, name }) => ({ id, name })),
            })
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    findOrCreateDiets: async (req, res) => {
        try {
            try { // ****** * DATABASE * *************
                // Get diets from database
                const diets = await Diet.findAll()

                // Handle missing diets in the database
                if (!diets.length)
                    throw new Error()

                // Map and send diets
                res.status(200).json({
                    data: diets.map(diet => dietUtils.mapDiet(diet)),
                    created: false,
                })
            } catch (error) { // ******** * API * ***************

                // Get diet names from API
                let { data: names, message } = await dietUtils.getDietNamesFromAPI()
                if (!names)
                    names = db.diets.map(({name}) => name)// In case the spoonacular API is down
        
                if (!names) throw Error(message)

                // Create diets in the database
                const diets = await Diet.bulkCreate(
                    names.map((name) => ({ name }))
                )
                // Map and send diets
                res.status(200).json({
                    data: diets.map(diet => dietUtils.mapDiet(diet)),
                    created: true,
                })
            }
        } catch (error) {
            // Reply error
            res.status(500).send({ error: error.message })
        }
    },
}