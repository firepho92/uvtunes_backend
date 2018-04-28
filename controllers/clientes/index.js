'use strict';

var ClienteModel = require('../../models/Cliente');
var dataConnection = require('../../config/config.json');
var connectionData = dataConnection.mysqlConnection;
var mysql = require('mysql');
var connection = mysql.createConnection(connectionData);

connection.connect();

module.exports = function (router) {

    var cliente = new ClienteModel;

    router.post('/', function (req, res) {
        res.send(req.body);
    });


};
