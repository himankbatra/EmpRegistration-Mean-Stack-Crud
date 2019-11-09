const express = require('express');
const bodyParser = require('body-parser');


const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var app = express();
app.use(bodyParser.json());
app.use(express.static('.'));


app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/employees', employeeController);

var path = require("path");
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });