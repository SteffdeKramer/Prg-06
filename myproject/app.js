/**
 * Created by stefd on 2016-11-27.
 */
var express = require('express');
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test')
    db =  mongoose.connect('mongodb://localhost/heroAPI_test');
else{
    db = mongoose.connect('mongodb://localhost/heroAPI')
}


var hero = require('./models/heroModel');
var app = express();
var port = process.env.PORT || 8000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//
// var heroRouter = express.Router();
//
//
//
// heroRouter.route('/Hero')
//     .post(function(req, res){
//         var Newhero = new hero(req.body);
//         Newhero.save();
//         res.status(201).send(Newhero);
//
// })
//     .get(function(req,res){
//
//         var query = { };
//         if(req.query.Powers){
//             query.Powers = req.query.Powers;
//         }
//        hero.find(query, function(err,hero){
//             if(err){
//                 res.status(500).send(err);
//             }
//             else{
//                 res.json(hero);
//             }
//         });
//
//
//     });
//
// heroRouter.route('/Hero/:heroId')
//     .get(function(req, res){
//         hero.findById(req.params.heroId, function(err,hero) {
//             if(err)
//                 res.status(500).send(err);
//             else
//                 res.json(hero);
//         });
//     });

app.use(function (req, res, next) {

    // res.set("Access-Control-Allow-Origin", "*");
    // res.set("Access-Control-Allow-Credentials", "true");
    // res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.set("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH');
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();

});
heroRouter = require('./Routes/heroRoutes')(hero);


app.get('/', function (req, res) {
    res.send('welcome bitches');
});

app.use('/api/Hero', heroRouter);

app.listen(port, function () {
    console.log('Gulp is running my fabulous server on PORT: ' + port);
});

 var mijnhero = new hero({
    Name: "Killerfrost",
     Powers: "ice",
     realName: "Caitlin Snow"

     });

var mijnanderehero = new hero({
    Name: "The Flash",
    Powers: "Super Speed",
    realName: "Barry Allen"

});

module.exports = app;
//mijnhero.save();
//mijnanderehero.save();