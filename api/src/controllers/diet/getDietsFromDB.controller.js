const { Diet } = require('../../db')


const getDietsFromDB = async (req, res) => {
    try {
        // Get diets from database
        let diets = await Diet.findAll()
        const mapDiets = diets.map(({ id, name }) => ({ id, name }))
        const [data, message] = [mapDiets, ""]
        // Send diets
        res
            .status(200)
            .json({ data, message })

    } catch (error) {
        const [data, message] = [[], error.message]
        res
            .status(500)
            .send({ data, message })
    }
}

module.exports = getDietsFromDB;