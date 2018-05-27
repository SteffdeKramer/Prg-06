/**
 * Created by stefd on 2016-12-14.
 */
var should = require('should'),
    sinon = require('sinon');

describe('Hero Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty Name on post', function(){
            var Hero = function(hero){this.save = function(){}};

            var req = {
                body: {
                    Powers: 'ice'
                }
            };
            var res = {
                status: sinon.spy(),
                    send: sinon.spy()
            };

            var heroController = require('../myproject/Controllers/heroController')(Hero);
            heroController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Name is required').should.equal(true);

        })
    })
});