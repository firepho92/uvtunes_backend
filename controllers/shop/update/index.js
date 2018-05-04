'use strict';

const Update = require('../../../models/shop/Update');

module.exports = function (router) {       
    router.post('/', function (req, res) {
        Update(req.body).then((result) => res.send(result));
    });
};
