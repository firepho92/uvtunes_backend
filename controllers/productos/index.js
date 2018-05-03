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
    router.get('/bytype', function (req, res) {
        connection.query('SELECT producto.id_producto, proveedor.nombre, productora.nombre, producto.nombre, producto.descripcion, producto. ano, producto.foto, producto.peso, producto.tipo_producto, producto.fisico, producto.digital, producto.precio_fisico, producto.precio_digital, producto.habilitado FROM producto INNER JOIN proveedor ON producto.id_productora = proveedor.id_proveedor INNER JOIN productora ON producto.id_productora = productora.id_productora WHERE producto.permitir_consulta = 1 AND producto.habilitado = 1', function (error, results){
            if(error) throw error;
            res.send(results);
        });
    });

};
