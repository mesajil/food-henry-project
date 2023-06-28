import axios from "axios"

const getRecipeById = async (id) => {
    if (!id) return { message: "No id found" }
    try {
        const url = `http://localhost:3001/recipes/${id}`
        const response = await axios.get(url)
        const { data: { data: recipe, message }, status } = response;
        if (status !== 200 || !recipe) return { message }
        return { data: recipe, message };
    } catch (error) {
        return { message: "Error while doing getRecipeById" }
    }
}


export default getRecipeById;