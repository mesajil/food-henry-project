const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller')
const dietController = require('../controllers/diet.controller')

const router = Router();

// CORS policy
router.options("/recipes/", (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendStatus(200);
});

// Configure recipe routes
router.get('/recipes/', recipeController.getRecipeByName) // Ok, uses API and Database
router.get('/recipes/:idRecipe', recipeController.getRecipeById) // Ok
router.post('/recipes/', recipeController.createRecipe) // Ok
router.get('/api/recipes', recipeController.getRecipesFromAPI) // Ok
router.get('/api/recipes/:id', recipeController.getRecipeByIdFromAPI) // Ok

// Configure diet routes
router.get('/diets/', dietController.findOrCreateDiets) // Ok, getDietNamesFromAPI try catch
router.get('/db/diets/', dietController.getDietsFromDB) // Ok
router.get('/api/diets/', dietController.getDietNamesFromAPI) // Ok

// Configure test routes
router.get('/hello', (req, res) => {
    res.status(200).send('Hello World!')
})

// Handle requests to unknown routes
router.all('*', (req, res) => {
    res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});

module.exports = router;
