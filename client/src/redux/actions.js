export const actionTypes = {
    ADD_RECIPES: "ADD_RECIPES",
}

export const addRecipes = (recipes) => ({
    type: actionTypes.ADD_RECIPES,
    payload: recipes,
})


