'use strict';

const ActivateModel = require('../../../models/shop/Activate');

module.exports = function (router) {       
    router.post('/', function (req, res) {
        let exito = ActivateModel(req.body);
        exito.then((result) => res.send(result));
    });
};
