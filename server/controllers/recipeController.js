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
	if (!recipe) {
		res.status(400).json({ error: 'No Such Recipe' })
	} else {
		res.status(200).json(recipe)
	}
}

// controllers 🔌

// get all recipes 👨‍🍳
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

// get all iced beverages 🧊
const getIced = async (req, res) => {
	const query = Recipe.find({ iced: true })
	try {
		const docs = await query.exec();
        res.json(docs).status(200)
		console.log('Iced retrieved successfully 🎉🧊')
	} catch (error) {
		console.log(error)
	}
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
	console.log('Recipe Deleted ✂︎')
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
	getIced,
	addRecipe,
	deleteRecipe,
	updateRecipe,
}