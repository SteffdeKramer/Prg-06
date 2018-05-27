/**
 * Created by stefd on 2016-12-08.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var heroModel = new Schema({
    Name: {
        type: String
    },
    Powers: {type: String},
    realName: {type: String},
    read: {type: Boolean, default:false}
});

module.exports= mongoose.model('Hero', heroModel);