const { Router } = require('express');
const recipeController = require('../controllers/recipe.controller')
const testController = require('../controllers/test.controller')

const router = Router();

// Setup recipe routes
router.get('/recipes/:id', recipeController.getRecipeById)

// Setup diet routes


// Setup test routes
router.get('/test/hello', testController.getHelloMessage)
router.get('/test/recipe/:id', testController.getRecipeInformationById)

// Handle requests to unknown routes
router.all('*', (req, res) => {
    res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});

module.exports = router;
