var express = require('express');
const cors = require("cors");
var app = express();
var things = require('./things.js');
var discounts = require ('./discounts.js');

app.use(cors());
app.use(express.json());
app.get('/', function(req, res){
   res.send("Welcomw to the application and port 3000");
});
app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
 });

app.use('/things', things);
app.use('/api/discount', discounts);
app.listen(3000);