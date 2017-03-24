const path = require("path");
const fs = require('fs');

const Router = require('restify-router').Router;
const routerInstance = new  Router();

const protoFile = function(req, res, next) {
    const protoFile =  path.resolve(".")  +  '/grpc/base.proto';

    fs.readFile(protoFile, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.setHeader('content-type', 'text/plain');
      res.send(200, data);
    });
}

/* Base stuff */
routerInstance.get('/proto', protoFile);

module.exports = routerInstance;
