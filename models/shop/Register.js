'use strict';

const mysql = require('mysql');
const nodemailer = require('nodemailer');
const TokenGenerator = require('uuid-token-generator');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;
const connection = mysql.createConnection(connectionData);

module.exports = function Register(param) {    
    function generateToken() {
        const tokgen = new TokenGenerator();
        let token = tokgen.generate();

        // Verify if token alredy exists...

        return token.substr(0, 10);
    }

    function generateMail(token) {
        return `<html>
                    <body style="text-align: center;">
                        <img src="http://localhost:3000/static/media/Logo.43a58311.png" alt="uvTunes" width="230" /><br /><br />
                        <div>
                            Gracias por registrarte en uvTunes! <br /><br />
                            Para activar su cuenta <a href="http://localhost:3000?token=` + token + `" target="_blank">pulse aqui</a>. Caso no funcione, use este link: <br />
                            <div style="background-color: #EFEFEF; display: table; font-family: Consolas, Verdana; font-size: 0.8em; margin: 10px auto; padding: 10px;">http://localhost:3000?token=` + token + `</d>
                        </div>
                    </body>
                </html>`;
    }

    return new Promise((exito) => connection.connect((err) => {
        if (err) {
            console.log("Error al conectar al MySQL -> " + err);
            exito(false);
        }

        const token = generateToken();
        
        const sql = `INSERT INTO cliente 
                       (nombre, apellido, fecha_nacimiento, email, contrasena, 
                        direccion, cp, ciudad, estado, token) VALUES (
                        '` + param.nombre + `',
                        '` + param.apellido + `',
                        '1994-08-11 23:59:59',
                        '` + param.email + `',
                        '` + param.contrasena + `',
                        '` + param.direccion + `',
                        '` + param.cp + `',
                        '` + param.ciudad + `',
                        '` + param.estado + `',
                        '` + token + `')`;
                        
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Error al registrar usuario -> " + err);
                exito(false);
            }
          
            const mailOptions = {
                from: 'uvTunes <no-reply@uvtunes.com.mx>',
                to: param.email,
                subject: 'Activate your account',
                html: generateMail(token)
            };

            const transporter = nodemailer.createTransport(configData.mailConfig);

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.log("Error al enviar código de activacion -> " + err);
                    exito(false);
                }

                exito(true);
            });
        });
    }));
};
