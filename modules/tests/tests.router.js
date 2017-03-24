var Router = require('restify-router').Router;
var routerInstance = new  Router();

const tests = require('./index');

const health = function(req, res, next) {
    res.send(200, { "health" :"ok"});
}

/* Base stuff */
routerInstance.get('/health', health);
routerInstance.get('/', tests.getTest);

module.exports = routerInstance;
