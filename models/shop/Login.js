'use strict';

const mysql = require('mysql');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;
const connection = mysql.createConnection(connectionData);

module.exports = function Login(param) {    
    return new Promise((exito) => connection.connect((err) => {
        let data = {
            "exito" : false,
            "error" : "Erro en el servidor"
        }

        if (err) {
            console.log("Error al conectar al MySQL -> " + err);
            exito(data);
        }
        
        const sql = `SELECT id_cliente 
                       FROM cliente 
                      WHERE email = '` + param.email + `' 
                        AND contrasena = '` + param.contrasena + `'`;
                        
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Error al intentar hacer login -> " + err);
                exito(data);
            }
            
            data.error = "Usuario no encontrado";

            if (result.length > 0) {
                if (result.activado) {
                    if (result.habilitado) {
                        data.exito = true,
                        data.error = null
                    } else {
                        data.error = "Su cuenta está deshabilitada.\nContacte el administrador"
                    }
                } else {
                    data.error = "Cuenta no activada"
                }
            } 

            exito(data);
        });
    }));
};
