const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    author: String,
    time: {
        total: String,
        prep: String,
        cook: String
    },
    description: String,
    ingredients: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    steps: {
        type: Array,
        of: String
    },
    nutrition: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('Recipe', recipeSchema);