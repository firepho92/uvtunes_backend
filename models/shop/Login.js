'use strict';

const mysql = require('mysql');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;
const connection = mysql.createConnection(connectionData);

module.exports = function Login(request) {    
    return new Promise((exito, falla) => connection.connect((err) => {
        let data = {
            "exito" : false,
            "error" : "Erro en el servidor"
        }

        if (err) {
            console.log("Error al conectar al MySQL -> " + err);
            exito(data);
        }
        
        const sql = `SELECT * 
                       FROM cliente 
                      WHERE email = '` + request.body.email + `' `;
                        // AND contrasena = '` + request.body.contrasena + `'`;
                        
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Error al intentar hacer login -> " + err);
                exito(data);
            }
            
            data.error = "Combinación inválida";

            if (result.length > 0) {
                if (result[0].activado) {
                    if (result[0].habilitado) {
                        data.exito = true;
                        data.error = null;
                        data.registro = result[0];

                        // Quita los campos inecesarios
                        ["contrasena", "salt", "activado", "habilitado", "token"].forEach(function (key) {
                            delete data.registro[key];
                        })
                        
                        // Guarda los datos en la sesión
                        request.session.store = data.registro;
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
