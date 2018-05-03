'use strict';

const crypto = require('crypto');
const RegisterModel = require('../../../models/shop/Register');
const TokenGenerator = require('uuid-token-generator');

module.exports = function (router) {       
    function getDateNow() { // Creado por "Toskan" en https://stackoverflow.com/questions/926332/how-to-get-formatted-date-time-like-2009-05-29-215557-using-javascript
        var data = new Date();    
        data = data.getFullYear() + "-" + ('0' + (data.getMonth() + 1)).slice(-2) + "-" + ('0' + data.getDate()).slice(-2) + " " + ('0' + data.getHours()).slice(-2) + ":" + ('0' + data.getMinutes()).slice(-2) + ":" + ('0' + data.getSeconds()).slice(-2);
    
        return data;
    }
    
    function generateToken() {
        const tokgen = new TokenGenerator();
        let token = tokgen.generate();

        return token.substr(0, 10);
    }

    function hashPassword(password) {
        var salt = crypto.randomBytes(128).toString('base64');
        var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
        return { "password" : hash.toString('hex'), "salt" : salt };
    }

    function prepararCampos(datos) { // Trata los campos antes de enviarlos para inserción
        Object.keys(datos).map(function (key) {
            if (key === "contrasena") {
                const password = hashPassword(datos[key].trim() === "" ? "1234" : datos[key]);

                datos[key] = password.password;
                datos["salt"] = password.salt;
            } else if (key === "fecha_nacimiento") {
                datos[key] = datos[key].split('/');
                datos[key] = datos[key][2] + "-" + datos[key][1] + "-" + datos[key][0] + " 00:00:00";
            } else if (datos[key].trim() === "") {
                datos[key] = null;
            }

            const token = generateToken();
            datos["token"] = token;
            datos["fecha_registro"] = getDateNow();
        });

        return datos;
    }

    router.post('/', function (req, res) {
        let data = prepararCampos(req.body);

        let exito = RegisterModel(data);
        exito.then((result) => res.send(result));
    });
};
