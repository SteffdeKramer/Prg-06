/**
 * Created by stefd on 2016-12-14.
 */
var heroController = function (Hero) {
    var post = function (req, res) {
        res.header("Allow", "GET, POST, OPTIONS");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');

             var hero = new Hero(req.body);
        // hero.save();
        // res.status(201);
        // res.send(hero);
        //

        if (!req.body.Name) {
            res.status(400);
            res.send('Name is required');
        }
        else if (!req.body.Powers) {
            res.status(400);
            res.send('Powers is required to be added')
        }
        else if (!req.body.realName) {
            res.status(400);
            res.send('Real Name is required to be added')
        }
        else {
            hero.save();
            res.status(201);
            res.send(hero);

        }
    };

    var get = function (req, res) {
        res.header("Allow", "GET, POST, OPTIONS");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
                
        if (!req.accepts('json')) {
            res.status(415);
            res.send('Only Accept Json is allowed');
        } else {


            var query = {};
            if (req.query.Powers) {
                query.Powers = req.query.Powers;
            }
            Hero.find(query, function (err, hero) {
                if (err) {
                    res.status(500).send(err);
                }
                else {

                    var count = 0;
                    var start, limit;



                    var returnHero = [];
                    hero.forEach(function (element, index, array) {
                        if(count == 0) {
                            if(req.query.start) {
                                start = parseInt(req.query.start);
                            } else {
                                start = 1;
                            }

                            if(req.query.limit) {
                                limit = parseInt(req.query.limit);
                            } else {
                                limit = hero.length;
                            }
                        }

                        count++;


                        var dbresult = element.toJSON();
                        var myHero = {
                            Name: dbresult.Name,
                            realName: dbresult.realName,
                            Powers: dbresult.Powers
                        };


                        myHero._links = {
                            self: {
                                href: 'http://' + req.headers.host + '/api/hero/' + dbresult._id
                            },
                            collection: {
                                href: 'http://' + req.headers.host + '/api/hero/'
                            }
                        };

                        if((count >= start) && (returnHero.length < limit)) {
                        returnHero.push(myHero); }




                    });
                    var collection = {};
                    collection.items = returnHero;
                    collection._links = {
                        self: {
                            href: 'http://' + req.headers.host + '/api/hero/'
                        }
                    };
                    collection.pagination = {};
                    collection.pagination.currentPage = Math.ceil(start / limit);
                    collection.pagination.currentItems = returnHero.length;
                    collection.pagination.totalPages = Math.ceil(hero.length / limit);
                    collection.pagination.totalItems = hero.length;

                    collection.pagination._links = {};
                    collection.pagination._links.first = {};

                    collection.pagination._links.first.page = 1;
                    collection.pagination._links.first.href = 'http://' + req.headers.host + '/api/hero?limit=' + limit;

                    collection.pagination._links.last = {};
                    collection.pagination._links.last.page = collection.pagination.totalPages;
                    collection.pagination._links.last.href = 'http://' + req.headers.host + '/api/hero?start=' + (hero.length - limit + 1) + '&limit=' + limit;


                    collection.pagination._links.previous = {};
                    if(collection.pagination.currentPage > 1) {
                        collection.pagination._links.previous.page = collection.pagination.currentPage - 1;
                        collection.pagination._links.previous.href = 'http://' + req.headers.host + '/api/hero?start=' + (start - limit) + '&limit=' + limit;
                    } else {
                        collection.pagination._links.previous.page = 1;
                        collection.pagination._links.previous.href = 'http://' + req.headers.host + '/api/hero?limit=' + limit;
                    }

                    collection.pagination._links.next = {};

                    collection.pagination._links.next = {};
                    if(collection.pagination.currentPage < collection.pagination.totalPages) {
                        collection.pagination._links.next.page = collection.pagination.currentPage + 1;
                        collection.pagination._links.next.href = 'http://' + req.headers.host + '/api/hero?start=' + (start + limit) + '&limit=' + limit;
                    } else {
                        collection.pagination._links.next.page = collection.pagination.totalPages;
                        collection.pagination._links.next.href = 'http://' + req.headers.host + '/api/hero?start=' + (hero.length - limit + 1) + '&limit=' + limit;
                    }

                    res.json(collection);
                }
            });
        }


    };

    var options = function (req, res) {
        res.header("Allow", "GET, POST, OPTIONS");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
        res.status(200).send();
    };


    return {
        post: post,
        get: get,
        options: options
    }


};

module.exports = heroController;