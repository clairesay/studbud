// import express
const express = require('express');

// initialise express
const app = express();

// serve static files from the public folder
// app.use(express.static('public'));
app.use(express.static(__dirname + '/dist'));

// serve the index file for the root / path - so if there 
app.get('/', function(req, res) {
    // res.sendFile(__dirname + '/public/index.html')
    res.sendFile(__dirname + '/dist/index.html')
})

// start the server, listen for incoming traffic and print message if successful
let server = app.listen(8888, function(){
    console.log("App server is running on port 8888");
});