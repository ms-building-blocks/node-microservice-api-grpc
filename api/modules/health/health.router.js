var Router = require('restify-router').Router;
var routerInstance = new  Router();
const moment = require('moment');


const health = function(req, res, next) {
    const upTime = process.uptime();

    res.send(200, {
        "health" :"ok",
        "type": "health",
        "uptime": upTime,
        "uptimeDisplay": moment.duration(upTime, 'seconds').humanize(),
    });
}

routerInstance.get('/', health);
module.exports = routerInstance;
