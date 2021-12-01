//Reusing the same mongoose instance as in config
const mongoose = require('mongoose');

// Created the schema for Todo list object (Task)
const todoListSchema = new mongoose.Schema({

    description: {
        type: String,
        require: true //Validation--must fill this field
    },

    category: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        require: true  
    }
  
});

//Naming the collection & creating mongoose model 
const Todo = mongoose.model('Todo', todoListSchema);

// Exporting the model to be used in 'index.js'
module.exports = Todo;