const express = require('express')
const router = express.Router()

const {
	getRecipes,
	getRecipe,
	addRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../controllers/recipeController')

// GET all recipes ❤️
router.get('/', getRecipes)

// GET a single recipe
router.get('/:id', getRecipe)

// POST a new Recipe
router.post('/', addRecipe)

// DELETE a Recipe
router.delete('/:id', deleteRecipe)

// UPDATE a new Recipe
router.patch('/:id', updateRecipe)

module.exports = router