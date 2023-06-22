import axios from "axios"

export const actionTypes = {
    GET_RECIPES: "GET_RECIPES",
    FILTER: "FILTER",
    GET_DIETS: "GET_DIETS",
    CREATE_RECIPE: "CREATE_RECIPE",
}




export const getRecipes = (name) => {
    return async function (dispatch) {
        try { // Get recipes by name
            const url = `http://localhost:3001/recipes/${name ? `?name=${name}` : ''}`
            const { data: { data: recipes, message } } = await axios.get(url)
            if (!recipes) throw Error(message)

            dispatch({
                type: actionTypes.GET_RECIPES,
                payload: recipes
            })
        } catch (error) { // Handle error
            dispatch({
                type: actionTypes.GET_RECIPES, // Save error en Redux
                payload: [],
            })
        }
    }
}

export const getDiets = () => {
    return async function (dispatch) {
        try {
            const url = `http://localhost:3001/diets`;
            const { data: { data: diets, message } } = await axios.get(url)
            if (!diets) throw Error(message)

            dispatch({
                type: actionTypes.GET_DIETS,
                payload: diets
            })
        } catch (error) {
            dispatch({
                type: actionTypes.GET_DIETS,
                payload: [],
            })
        }

    }
}

export const createRecipe = (recipe) => {
    return async function (dispatch) {
        try {
            const url = `http://localhost:3001/recipes/`;
            console.log(recipe);
            const { data: { data, message } } = await axios.post(url, recipe)
            if (!data) throw Error(message)
            console.log("Recipe created!");
            dispatch({
                type: actionTypes.CREATE_RECIPE,
                payload: { ...data, created: true },
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const filterByFilterObject = (filterObject) => ({
    type: actionTypes.FILTER,
    payload: filterObject,
})

