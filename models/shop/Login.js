'use strict';

const mysql = require('mysql');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;

module.exports = function Login(request) {    
    const connection = mysql.createConnection(connectionData);
        
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
                      WHERE email = '` + request.body.email + `'
                        AND contrasena = '` + request.body.contrasena + `'`;
                        
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

                        let fechan = data.registro["fecha_nacimiento"];
                        data.registro["fecha_nacimiento"] = ("0" + fechan.getDate()).slice(-2) + "/" + ("0" + (fechan.getMonth() + 1)).slice(-2) + "/" + fechan.getFullYear();

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
