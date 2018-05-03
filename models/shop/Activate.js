'use strict';

const mysql = require('mysql');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;
const connection = mysql.createConnection(connectionData);

module.exports = function Activate(param) {    
    return new Promise((exito) => connection.connect((err) => {
        let data = {
            "exito" : false,
            "error" : "Erro en el servidor"
        }

        if (err) {
            console.log("Error al conectar al MySQL -> " + err);
            exito(data);
        }
        
        const sql = `UPDATE cliente 
                        SET activado = true
                      WHERE token = '` + param.token + `'`;
                        
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Error al intentar activar cuenta -> " + err);
                exito(data);
            }
                        
            data.exito = true,
            data.error = null
            
            exito(data);
        });
    }));
};
