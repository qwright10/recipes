const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('https');
const model = require('./model');
const fs = require('fs');
const path = require('path');

app.set('view engine', 'pug');
app.use('/images', express.static('static'));
app.get('/style.css', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'style.css')));
app.get('/manifest.json', (_req, res) => res.sendFile(path.join(__dirname, 'manifest.webmanifest')));

app.get('/', async (req, res) => {
    const list = await model.find().lean();
    res.render('index', { list });
});

app.get('/insert', async (req, res) => {
    await model.create(require('./recipe.json')).then((d) => {
        res.send(d).end();
    });
});

app.get('/recipes/:id', async (req, res) => {
    const recipes = await model.find().lean();
    const recipe = recipes[req.params.id];
    res.render('recipe', recipe);
});

app.listen(80, () => {
    console.log('listening');
});

mongoose.connect('mongodb://localhost:27017/recipes', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});