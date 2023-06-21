


const filterRecipesByName = (recipes, name) => {
    if (!name) return recipes
    return recipes.filter((recipe) => (
        recipe.name.toLowerCase().includes(name.toLowerCase())
    ))
}


module.exports = {
    filterRecipesByName
}