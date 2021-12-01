// require monggose module
const mongoose = require('mongoose');

 // connecting to the database
 mongoose.connect('mongodb://localhost/todo_lists_db');

 // giving access to database
 const db = mongoose.connection;

 // Error in connecting
 db.on('error', console.error.bind(console, "Error connecting to database!"));

 // db open to interact with database i.e. up and running then prints the message
 db.once('open', function(){
     console.log("Successfully connected to the database!!");
 });
 