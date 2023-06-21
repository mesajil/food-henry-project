

const errors = {
    ERR_FETCH_API: (message) => `Error fetching from API: ${message}`, 
    ERR_FETCH_DB: (message) => `Error fetching from database: ${message}`,
    ERR_GET_RECIPES: (message) => `getRecipesError: ${message}`,
    ERR_GET_RECIPES_BY_NAME: (message) => `getRecipesByNameError: ${message}`,
    ERR_RECIPE_ID_MISSING: (message) => `Recipe id is missing: ${message}`,
    ERR_GET_RECIPE_BY_ID_FROM_API: (message) => `getRecipeByIDFromAPIError: ${message}`,
    ERR_MISSING_DIETS: (message) => `Diets are missing: ${message}`,
    ERR_GET_DIET_NAMES_FROM_API: (message) => `getDietNamesFromAPI: ${message}`,
}

module.exports = errors;