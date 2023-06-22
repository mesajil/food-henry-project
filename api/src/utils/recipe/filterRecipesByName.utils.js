

const filterRecipesByName = (recipes, name) => {
    if (!name) return recipes
    const filter = recipes
        .filter((recipe) => {
            recipeName = recipe.name.toLowerCase()
            pattern = name.toLowerCase()
            return recipeName.includes(pattern)
        })
    return filter
}

module.exports = filterRecipesByName