const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipes.js')

require('dotenv').config()
const { MONGO_URI } = process.env

// instantiate express app
const app = express();

// mongoose setting
mongoose.set('strictQuery', false);

try {
    // connect to mongodb
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // listen for requests
    app.listen(3000);
    console.log('Server started successfully on port 3000')

} catch (error) {
    console.log(error);
    process.exit(1);
}


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router 
app.use('/api/recipes', recipeRoutes)

// routes
app.get('/', (req, res) => {
    console.log({
		Path: req.path,
		Method: req.method,
        Mood: '🚀'
	});
    console.log('server received request for index 🙂');
});

// 404 page
app.use((req, res) => {
    res.status(404).render();
  });