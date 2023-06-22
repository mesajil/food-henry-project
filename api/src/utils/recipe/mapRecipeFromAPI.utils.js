


const mapRecipeFromAPI = (recipe) => {
    console.log(recipe);
    const { summary } = recipe;
    return {
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        summary: summary.replace(/(<([^>]+)>)/ig, ''), // Strip out all HTML tags
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions,
        diets: recipe.diets,
        created: false, // Fetching from API
    }
}

module.exports = mapRecipeFromAPI;