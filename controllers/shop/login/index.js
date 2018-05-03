'use strict';

let Login = require('../../../models/shop/Login');

module.exports = function (router) {
    router.post('/', function (req, res) {
        Login(req).then((result) => res.send(result));
    });
};
