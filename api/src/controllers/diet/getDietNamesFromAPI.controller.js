const getDietNamesFromAPI = require('../../utils/diet/getDietNamesFromAPI.utils')

const getDietNamesFromAPIController = async (req, res) => {
    try {
        // Get diet names from API
        let { data, message } = await getDietNamesFromAPI()
        if (!data.length) throw Error(message)
        res
            .status(200)
            .json({ data, message: "" })
    } catch (error) {
        res
            .status(500)
            .send({ error: error.message })
    }
}

module.exports = getDietNamesFromAPIController;