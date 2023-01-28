const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')


// utility functions ⚙️
const checkId = (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'Invalid Document ID Format' })
	} else {
		return id
	}
}

const checkDocument = (recipe, res) => {
	!recipe
		? res.status(400).json({ error: 'No Such Recipe' })
		: res.status(200).json(recipe)
}

// controllers 🔌
const getRecipes = async (req, res) => {
	const recipes = await Recipe.find({}).sort({ createdAt: -1 })
	res.status(200).json(recipes)
}

// get single recipe 👨‍🍳
const getRecipe = async (req, res) => {
	const id = await checkId(req, res)
	const recipe = await Recipe.findById(id)
	checkDocument(recipe, res)
}

// create recipe 👨‍🍳
const addRecipe = async (req, res) => {
	const { recipeName, iced, ingredients, description, instructions } = req.body

	// Add doc to DB ✍️
	try {
		const newRecipe = await Recipe.create({ recipeName, iced, ingredients, description, instructions })
		res.status(200).json(newRecipe)
		console.log("New document added successfully 🔨")
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
	const id = await checkId(req, res)
	const recipe = await Recipe.findOneAndDelete({ _id: id })
	checkDocument(recipe, res)
}

// Update a recipe --> Model.updateOne()
const updateRecipe = async (req, res) => {
	const id = await checkId(req, res)
	const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body })
	checkDocument(recipe, res)
}

module.exports = {
	getRecipes,
	getRecipe,
	addRecipe,
	deleteRecipe,
	updateRecipe,
}