import axios from "axios"

export const actionTypes = {
    GET_RECIPES: "GET_RECIPES",
    FILTER: "FILTER",
    FILTER_BY_DIET: "FILTER_BY_DIET",
    FILTER_BY_DATA_SOURCE: "FILTER_BY_DATA_SOURCE",
    SORT_BY_NAME: "SORT_BY_NAME",
    SORT_BY_HEALTH_SCORE: "SORT_BY_HEALTH_SCORE",
    CREATE_RECIPE: "CREATE_RECIPE",
}



// export const getRecipes = async (dispatch, name) => {
//     try {
//         const url = `http://localhost:3001/recipes/${name ? `?name=${name}` : ''}`
//         const { data: { recipes } } = await axios(url)
//         return dispatch({
//             type: actionTypes.GET_RECIPES,
//             payload: recipes
//         })
//     } catch (error) {
//         console.log(error.message);
//         return dispatch({
//             type: actionTypes.GET_RECIPES,
//             payload: [],
//         })
//     }
// }
export const getRecipes = (name) => {
    return async function (dispatch) {
        try { // Get recipes by name
            const url = `http://localhost:3001/recipes/${name ? `?name=${name}` : ''}`
            const { data: { recipes } } = await axios.get(url)
            dispatch({
                type: actionTypes.GET_RECIPES,
                payload: recipes
            })
        } catch (error) { // Handle error
            console.log(error.message);
            dispatch({
                type: actionTypes.GET_RECIPES,
                payload: [],
            })
        }
    }
}


export const filterByFilterObject = (filterObject) => ({
    type: actionTypes.FILTER,
    payload: filterObject,
})

