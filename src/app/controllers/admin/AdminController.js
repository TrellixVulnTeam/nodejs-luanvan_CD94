const Food = require('../../models/Food');
const Foodtype = require('../../models/Foodtype');

const { mongooseToObject } = require('../../../util/mongoose');

class AdminController {
    // [GET] /admin
    index(req, res, next) {
        res.render('admin/admin');
    }
    
}

module.exports = new AdminController();