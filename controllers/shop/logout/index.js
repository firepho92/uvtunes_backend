'use strict';

module.exports = function (router) {
    router.post('/', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log("Error al cerrar session -> " + err);
                res.send(false);
            } else {
                res.send(true)
            }
        });
    });
};