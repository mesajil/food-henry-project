const { Router } = require('express');
const getRecipeByName = require('../controllers/recipe/getRecipeByName.controller')
const getRecipeById = require('../controllers/recipe/getRecipeById.controller')
const createRecipe = require('../controllers/recipe/createRecipe.controller')
const getRecipesFromAPI = require('../controllers/recipe/getRecipesFromAPI.controller')
const getRecipeByIdFromAPI = require('../controllers/recipe/getRecipeByIdFromAPI.controller')
const findOrCreateDiets = require('../controllers/diet/findOrCreateDiets.controller')
const getDietNamesFromAPI = require('../controllers/diet/getDietNamesFromAPI.controller')
const getDietsFromDB = require('../controllers/diet/getDietsFromDB.controller')

const router = Router();

// CORS policy
router.options("/recipes/", (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendStatus(200);
});

// Recipe routes (From API and Database)
router.get('/recipes/', getRecipeByName)  // Ok
router.get('/recipes/:idRecipe', getRecipeById) // Ok
router.post('/recipes/', createRecipe) // Ok

// Recipe routes (From API)
router.get('/api/recipes', getRecipesFromAPI) // Ok
router.get('/api/recipes/:id', getRecipeByIdFromAPI) // Ok

// Diet routes (From API)
router.get('/diets/', findOrCreateDiets) // Ok
router.get('/api/diets/', getDietNamesFromAPI) // Ok

// Diet routes (From Database)
router.get('/db/diets/', getDietsFromDB) // Ok



// Test route
router.get('/hello', (req, res) => {
    res
        .status(200)
        .send('Hello World!')
})

// Handle Unknown routes
router.all('*', (req, res) => {
    const message = `Unknown route: ${req.method} ${req.originalUrl}`
    res
        .status(404)
        .send({ message });
});

module.exports = router;
