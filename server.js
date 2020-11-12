/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
// app.use(express.json());

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// const { static, response } = require('express');
// const { request } = require('https');
app.use(cors());
// connect our server-side code (code in server.js) to our client-side code (browser written in files housed in website folder)
app.use(express.static("website"));
// Routes
const port = 8000;
// TODO-Spin up the server
const server = app.listen(port,() => { 
    console.log("server running");
    console.log(`running on localhost: ${port}`);
});
// GET  '/all'
app.get("/all",(request,response)=>{
    response.send(projectData);
    projectData = []
});
// POST route
app.post('/add', addData);

function addData (request,response){
    console.log(request.body);
    newEntry = {
        temperature : request.body.temperature,
        date : request.body.date,
        content : request.body.content
    }
    projectData.push(newEntry);
}