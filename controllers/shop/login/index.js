'use strict';

let LoginModel = require('../../../models/shop/Login');

module.exports = function (router) {
    router.post('/', function (req, res) {
        let login = LoginModel(req.body);
        login.then((result) => res.send(result));
    });
};