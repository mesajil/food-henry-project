const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller')
const dietController = require('../controllers/diet.controller')
const apiController = require('../controllers/api.controller')

const router = Router();

// Configure recipe routes
router.post('/recipes/', recipeController.createRecipe)
router.get('/recipes/', recipeController.getRecipesByNameMatch)
router.get('/recipes/:idRecipe', recipeController.getRecipeById)
router.get('/api/recipe', apiController.getRecipes)
router.get('/api/recipe/:id', apiController.getRecipeInformationById)

// Configure diet routes
router.get('/diets/', dietController.getDiets)
router.get('/api/diets/', dietController.getDietNamesFromAPI)
router.get('/db/diets/', dietController.getDietsFromDB)

// Configure test routes
router.get('/hello', (req, res) => {
    res.status(200).send('Hello World!')
})

// Handle requests to unknown routes
router.all('*', (req, res) => {
    res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});

module.exports = router;
