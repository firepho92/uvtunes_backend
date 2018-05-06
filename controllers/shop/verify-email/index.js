'use strict';

const VerifyEmail = require('../../../models/shop/VerifyEmail');

module.exports = function (router) {
    router.post('/', function (req, res) {
        VerifyEmail(req).then((result) => res.send(result));
    });
};
