/**
 * Created by stefd on 2016-12-11.
 */
var express = require('express');

var routes = function (hero) {
    var heroRouter = express.Router();

    var heroController = require('../Controllers/heroController')(hero);

    heroRouter.route('/')
        .options(heroController.options)
        .post(heroController.post)
        .get(heroController.get);


    heroRouter.use('/:heroId', function (req, res, next) {

        hero.findById(req.params.heroId, function (err, hero) {
            if (err)
                res.status(500).send('hey dit werkt niet');

            else if (hero) {
                req.hero = hero;
                next();
            }
            else {
                res.status(404).send('no Hero found');
            }

        });
    });
    heroRouter.route('/:heroId')
        .get(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH');
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            
            var returnHero = req.hero.toJSON();

            returnHero._links = {};
            returnHero._links.self = {};
            returnHero._links.self.href = 'http://' + req.headers.host + '/api/hero/' + returnHero._id;
            returnHero._links.collection = {};
            returnHero._links.collection.href = 'http://' + req.headers.host + '/api/hero/';
            // var newLink = 'http://' + req.headers.host + '/api/hero/?Powers=' + returnHero.Powers;
            // returnHero.links.FilterByThisPowers = newLink.replace(' ', '%20');
            // returnHero.links.FilterByThisPowers = 'http://' + req.headers.host + '/api/hero/?Powers=' + returnHero.Powers;
            res.json(returnHero);
        })


        .put(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH');
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

            req.hero.Name = req.body.Name;
            req.hero.Powers = req.body.Powers;
            req.hero.realName = req.body.realName;
            req.hero.read = req.body.read;
            req.hero.save(function (err) {
                if (err)
                    res.status(500).send(err);

                else if (!req.body.Name) {
                    res.status(400);
                    res.send('Name is required');
                }
                else if (!req.body.Powers) {
                    res.status(400);
                    res.send('Powers is required');
                }
                else if (!req.body.realName) {
                    res.status(400);
                    res.send('realName is required');
                }

                else {
                    res.json(req.hero);
                }
            });

        })
        .patch(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH');
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            if (req.body._id)
                delete req.body._id;
            for (var p in req.body) {
                req.hero[p] = req.body[p];
            }
            req.hero.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.hero);
                }
            });
        })
        .delete(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH');
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            req.hero.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            })
        })

        .options(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH');
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.status(200).send();

        });

    return heroRouter;

};

module.exports = routes;