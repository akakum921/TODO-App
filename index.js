const express = require('express');

// get the path object
const path = require('path');

const port = 8000;

// get the access to the database
const db = require('./config/mongoose');

//get the Todo schema & used to populate the database / or to create the enteries 
const Todo = require('./models/todo_list')

//firing up the express
const app = express();

//setting up the ejs as the view engine for express server
app.set('view engine', 'ejs'); 

// set the path for views file by connecting main directory to views folder
app.set('views', path.join(__dirname, 'views'));

//middleware function to parser the incoming requests
app.use(express.urlencoded());

//accessing static files (css/js/img)
app.use(express.static('assets'));


// rendering the home file
app.get('/', function (req, res) {
    Todo.find({}, function (err, todos) {
        if (err) {
            console.log('error', err);
            return;
        }
        return res.render('home',
            {
                title: "TODO APP",
                todo_list: todos
            }
        );
    });
});

// Create Todo Task
app.post('/create-todo', function (req, res) {
    Todo.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        }, function (err, newtodo) {
            if (err) {
                console.log('Error in creating the task: ', err);
                return;
            }
            return res.redirect('/');
        }
    )
});

// Delete for single todo task
app.get('/delete_todo_single', function(req, res) {
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function(err){
        if(err) {
            console.log("Error in delete");
            return;
        }
        return res.redirect('/');
    });

});

// Delete for multiple todo task
app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    // to delete single task 
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("Error in deleting!"); 
                return; 
            }
        });
    } 
    else {    // to delete multiple todo task 

        //to check if one or more items are selected or not
        if(ids){
            for (let i = 0; i < ids.length; i++) {
               Todo.findByIdAndDelete(ids[i], function (err) {
                  if (err) { 
                     console.log("Error in deleting!");
                     return; 
                  }
               });
           }
        }
        return res.redirect('/');

    }
    return res.redirect('/');

});



//server listening on port 8000 
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in ruuning the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});