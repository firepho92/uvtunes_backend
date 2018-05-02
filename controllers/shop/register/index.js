'use strict';

let RegisterModel = require('../../../models/shop/Register');

module.exports = function (router) {
    router.post('/', function (req, res) {
        let exito = RegisterModel(req.body);
        exito.then((result) => res.send(result));
    });
};
