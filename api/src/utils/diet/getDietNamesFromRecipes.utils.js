


const getDietNamesFromRecipes = (recipes) => {
    let names = []
    recipes.forEach(recipe => names.push(...recipe.diets))
    const dietNames = Array.from(new Set(names))
    return dietNames;
}

module.exports = getDietNamesFromRecipes;