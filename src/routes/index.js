const adminRouter = require('./admin/admin');
const foodRouter = require('./admin/food');
const authRouter = require('./auth');

function route(app) {
    
    app.use('/', foodRouter);
    app.use('/admin', adminRouter);
    app.use(authRouter);
}

module.exports = route;
