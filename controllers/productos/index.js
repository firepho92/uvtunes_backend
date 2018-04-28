'use strict';

var ProductoModel = require('../../models/Producto');
var dataConnection = require('../../config/config.json');
var connectionData = dataConnection.mysqlConnection;
var mysql = require('mysql');
var connection = mysql.createConnection(connectionData);

connection.connect();

module.exports = function (router) {

    var productos = new ProductoModel;

    router.get('/', function (req, res) {
        connection.query('SELECT * FROM producto', function (error, results){
            if(error) throw error;
            res.send(results);
        });
    });

};
