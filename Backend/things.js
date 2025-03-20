var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send("Get route on thing");
})

router.post('/', function(req,res){
    res.send('post request on thing');
});

module.exports = router;