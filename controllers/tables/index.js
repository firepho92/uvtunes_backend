'use strict';

var ProductoModel = require('../../models/Producto');
var dataConnection = require('../../config/config.json');
var connectionData = dataConnection.mysqlConnection;
var mysql = require('mysql');
var connection = mysql.createConnection(connectionData);

connection.connect();

module.exports = function (router) {

    var productos = new ProductoModel;

    router.get('/showTables', function (req, res) {
        connection.query('Show tables', function (error, results){
            if(error) throw error;
            res.send(results);
        });
    });

    router.get('/tableColumns', function (req, res) {
        var tableName = req.query.table;
        connection.query('describe ' + tableName, function (error, results){
            if(error) throw error;
            connection.query('select * from ' + tableName, function (e, r){
                if(e) throw error;
                var table = {
                    columns: results,
                    data: r
                }
                console.log(table);
                res.send(table);
            });
            //res.send(results);
        });

    });

    router.get('/tableData', function (req, res) {
        var table = req.query.table;
        connection.query('select * from ' + table, function (error, results){
            if(error) throw error;
            res.send(results);
        });
    });

};
