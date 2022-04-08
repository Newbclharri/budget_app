require("dotenv").config();
////////////////////////
// Database
////////////////////////

const budget = require("./models/budget.js");


////////////////////////
// Setup - Import deps and create app object
////////////////////////
const expressServer = require("express");
const app = expressServer();
const PORT = process.env.PORT;

//////////////////////
// Declare Middleware
//////////////////////
app.use(expressServer.static('views'))
// app.use('/static',expressServer.static('public'))
app.use(expressServer.urlencoded({extended: false})); //need this because html form data is not JSON formatted

///////////////////////
// Declare Routes and Routers 
///////////////////////

//root/////
app.get("/", (req, res) => {
    res.send("You are at the root");
});

//index
app.get("/budgtr", (req, res) => {
    
    res.render("index.ejs",{budget: budget},)
});

//show
app.get("/budgtr/:id", (req, res)=>{
    res.render("show.ejs",{expenditure:budget[req.params.id]},)
});

///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, ()=>{
    console.log("You are listening on port ", PORT);
});