require("dotenv").config();

////////////////////////
// Database
////////////////////////
const budget = require("./models/budget.js");
console.log(bankAccount())


////////////////////////
// Setup - Import deps and create app object
////////////////////////
const expressServer = require("express");
const { redirect, type } = require("express/lib/response");
const app = expressServer();
const PORT = process.env.PORT;

//////////////////////
// Declare Middleware
//////////////////////
// app.use(expressServer.static('public'))
app.use('/static',expressServer.static('public'))
app.use(expressServer.urlencoded({extended: false})); //need this because html form data is not JSON formatted


///////////////////////
// Declare Routes and Routers 
///////////////////////

//root
app.get("/", (req, res) => {
    res.send("You are at the root");
});

//index
app.get("/budgtr/", (req, res) => {
    console.log("Account: ", bankAccount())
    res.render("index.ejs",{
        budget: budget,
        bankAccount: bankAccount(),
    })
});

//new
app.get("/budgtr/new/", (req, res) =>{
    res.render("new.ejs",{an_expense: budget[0]});

});

app.post("/budgtr/",(req, res)=>{
    // console.log(req.body);
    const tagsArray = req.body.tags.split(",");
    req.body.tags = null;
    req.body.tags = [...tagsArray];
    req.body.amount = parseFloat(req.body.amount);
    budget.push(req.body);
    // console.log("budget: ",budget);
    res.redirect("/budgtr/");
});

//show
app.get("/budgtr/:id", (req, res)=>{
    res.render("show.ejs",{expenditure:budget[req.params.id]})
});



///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, ()=>{
    console.log("You are listening on port ", PORT);
});


///////////////////////////
// Functions
///////////////////////////
function bankAccount (){
    let sum = 0;
    for(let i = 0; i < budget.length; i++){
        sum += budget[i].amount
    }
    
    return sum
}

