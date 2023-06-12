const { Diet } = require('../db')
const dietUtils = require('../utils/diet.utils')

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
            // Reply error
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

                // Return error if diets not found
                if (!diets.length)
                    throw new Error("Diets not found in the database")

                // Map and send diets
                res.status(200).json({
                    data: diets.map(diet =>
                        dietUtils.mapDiet(diet)
                    ),
                    created: false,
                })
            } catch (error) { // ******** * API * ***************
                // Get diets from API
                const dietNames = await dietUtils.getDietNamesFromAPI()
                // Save diets in the database
                const diets = await Diet.bulkCreate(
                    dietNames.map((name) => ({ name }))
                )

                // Map and send diets
                res.status(200).json({
                    data: diets.map(diet =>
                        dietUtils.mapDiet(diet)
                    ),
                    created: true,
                    databaseError: error.message
                })
            }
        } catch (error) {
            // Reply error
            res.status(500).send({
                error: error.message
            })
        }
    },
}