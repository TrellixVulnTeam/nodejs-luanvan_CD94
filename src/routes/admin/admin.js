const express = require('express');
const router = express.Router();

const adminController = require('../../app/controllers/admin/AdminController');

// [GET] /admin
router.get('/', adminController.index);
router.get('/create', adminController.create);
router.get('/foodlist', adminController.show);
router.get('/foodtypelist', adminController.showfoodtype);
router.get('/foodtype/createtype', adminController.createfoodtype);


module.exports = router;