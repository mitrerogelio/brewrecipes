const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    ingredientName: {
        type: String,
        required: [true, 'Ingredient name is required']
    },
    amount: {
        type: Number,
    },
    needed: {
        type: Boolean,
        default: true
    }
});

const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true,
    },
    iced: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [ingredientSchema],
        required: true,
    },
    description: {
        type: String
    },
    instructions: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
