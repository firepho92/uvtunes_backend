'use strict';

const mysql = require('mysql');
const nodemailer = require('nodemailer');

const configData = require('../../config/config.json');
const connectionData = configData.mysqlConnection;

module.exports = function Register(datos) {     
    const connection = mysql.createConnection(connectionData);
    
    function generateMail(token) {
        return `<html>
                    <body style="text-align: center;">
                        <img src="https://uvtunes-client.herokuapp.com/static/media/Logo.43a58311.png" alt="uvTunes" width="230" /><br /><br />
                        <div>
                            Gracias por registrarte en uvTunes! <br /><br />
                            Para activar su cuenta <a href="https://uvtunes-client.herokuapp.com/?token=` + token + `" target="_blank">pulse aqui</a>. Caso no funcione, use este link: <br />
                            <div style="background-color: #EFEFEF; display: table; font-family: Consolas, Verdana; font-size: 0.8em; margin: 10px auto; padding: 10px;">https://uvtunes-client.herokuapp.com/?token=` + token + `</d>
                        </div>
                    </body>
                </html>`;
    }

    return new Promise((exito) => connection.connect((err) => {
        if (err) {
            console.log("Error al conectar al MySQL -> " + err);
            exito(false);
        }
                        
        let query = connection.query('INSERT INTO cliente SET ?', datos, function (err, result) {
            if (err) {
                console.log("Error al registrar usuario -> " + err);
                exito(false);
            }
          
            const mailOptions = {
                from: 'uvTunes <no-reply@uvtunes.com.mx>',
                to: datos.email.replace(/'/g, ''),
                subject: 'Activate your account',
                html: generateMail(datos.token.replace(/'/g, ''))
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
