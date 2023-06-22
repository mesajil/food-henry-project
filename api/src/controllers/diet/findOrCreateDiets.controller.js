const { Diet } = require('../../db')
const mapDiet = require('../../utils/diet/mapDiet.utils')
const getDietNamesFromAPI = require('../../utils/diet/getDietNamesFromAPI.utils')
// const db = require('../utils/examples/db') // In case the spoonacular API is down


const findOrCreateDiets = async (req, res) => {
    try {
        try { // ****** * DATABASE * *************
            // Get diets
            const diets = await Diet.findAll()

            // Handle missing diets in the database
            if (!diets.length) throw new Error(`Missing diets in the database`)

            // Map diets
            const data = diets.map(diet => mapDiet(diet))
            const created = false; // Fetch from database
            res
                .status(200)
                .json({ data, created })
        } catch (error) { // ******** * API * ***************
            const errors = [error.message] // missing diets in the database

            // Get diet names from API
            let { data: names, message } = await getDietNamesFromAPI()
            // if (!names.length)
            //     names = db.diets.map(({ name }) => name)// In case the spoonacular API is down

            // Create diets in the database
            const diets = await Diet.bulkCreate(
                names.map((name) => ({ name }))
            )

            const data = diets.map(diet => mapDiet(diet))
            const created = true; // Diets were created in the database

            res
                .status(200)
                .json({ data, created, message })
        }
    } catch (error) {
        const message = `Error finding or creating diets in the database: ${error.message}`
        res
            .status(500)
            .send({ message })
    }
}

module.exports = findOrCreateDiets;