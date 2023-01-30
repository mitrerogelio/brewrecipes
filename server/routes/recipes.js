const express = require('express')
const router = express.Router()

const {
	getRecipes,
	getRecipe,
	getIced,
	addRecipe,
	deleteRecipe,
	updateRecipe,
} = require('../controllers/recipeController')

// GET all recipes ❤️
router.get('/', getRecipes)

// GET all iced recipes 🧊
router.get('/iced', getIced)

// GET a single recipe
router.get('/:id', getRecipe)

// POST a new Recipe
router.post('/', addRecipe)

// DELETE a Recipe
router.delete('/:id', deleteRecipe)

// UPDATE a new Recipe
router.patch('/update/:id', updateRecipe)

module.exports = router