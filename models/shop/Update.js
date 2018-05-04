'use strict';

const mysql = require('mysql');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;

module.exports = function Activate(param) {    
    const connection = mysql.createConnection(connectionData);

    return new Promise((exito) => connection.connect((err) => {
        if (err) {
            console.log("Error al conectar al MySQL -> " + err);
            exito(false);
        }
        
        const sql = `UPDATE cliente 
                        SET direccion = ` + (param.direccion !== null ? "'" + param.direccion + "'" : "null") + `, 
                            cp = ` + (param.cp !== null ? "'" + param.cp + "'" : "null") + `,
                            ciudad = ` + (param.ciudad !== null ? "'" + param.ciudad + "'" : "null") + `,
                            estado = ` + (param.estado !== null ? "'" + param.estado + "'" : "null") + `
                      WHERE id_cliente = ` + param.id_cliente + ` 
                        AND email = '` + param.email + `'`;
                        
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Error al intentar activar cuenta -> " + err);
                exito(false);
            }
            
            exito(true);
        });
    }));
};
