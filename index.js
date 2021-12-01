const express = require('express');

// get the path object
const path = require('path');

const port = 8000;

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


//server listening on port 8000 
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in ruuning the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});