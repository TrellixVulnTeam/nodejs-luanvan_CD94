const Order_model = require('../models/Order');
const Orderdetails_model = require('../models/Orderdetails');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToOject } = require('../../util/mongoose');



class OrderController {

    //[GET] /staff/ 
    neworder(req, res, next) {
        Order_model.find({ orderstatus: null })
            .then((order) => {
                res.render('order/index', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[GET] /staff/confirmed 
    confirmed(req, res, next) {
        Order_model.find({ orderstatus: 1 })
            .then((order) => {
                res.render('order/confirmed', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[GET] /staff/accomplished 
    accomplished(req, res, next) {
        Order_model.find({ $or: [{orderstatus: 2},{ orderstatus: 3 }] })
            .then((order) => {
                res.render('order/accomplished', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[POST] /staff/confirm/:id
    confirm(req, res, next) {
        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-confirmed'))
            .catch(next);
    }

    //[POST] /staff/complete/:id
    complete(req, res, next) {
        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-accomplished'))
            .catch(next);
    }

    //[POST] /staff/cancel/:id
    cancel(req, res, next) {
        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-accomplished'))
            .catch(next);
    }

    //[GET] /staff/orderdetails/:id
    async orderdetails(req, res, next) {
        Promise.all([
            Order_model.findById({ _id: req.params.id }),
            Orderdetails_model.find({ orderid: req.params.id }).populate('foodid')
        ])
            .then(([order, orderdetails]) => {
                res.render('order/order-details', {
                    order: mongooseToObject(order),
                    orderdetails: multipleMongooseToOject(orderdetails)
                })
            })
            .catch(next);
    }

    //[GET] /staff/orderdetails-confirmed/:id
    async orderdetailsconfirmed(req, res, next) {
        Promise.all([
            Order_model.findById({ _id: req.params.id }),
            Orderdetails_model.find({ orderid: req.params.id }).populate('foodid')
        ])
            .then(([order, orderdetails]) => {
                res.render('order/order-details-confirmed', {
                    order: mongooseToObject(order),
                    orderdetails: multipleMongooseToOject(orderdetails)
                })
            })
            .catch(next);
    }

    //[GET] /staff/orderdetails-confirmed/:id
    async orderdetailsaccomplished(req, res, next) {
        Promise.all([
            Order_model.findById({ _id: req.params.id }),
            Orderdetails_model.find({ orderid: req.params.id }).populate('foodid')
        ])
            .then(([order, orderdetails]) => {
                res.render('order/order-details-accomplished', {
                    order: mongooseToObject(order),
                    orderdetails: multipleMongooseToOject(orderdetails)
                })
            })
            .catch(next);
    }

}


module.exports = new OrderController();
