
var colors = require('colors');

// const debug = require('debug')('store')
// const name = 'store'
// debug('booting %s', name)

var currentDir = __dirname;
currentDir = currentDir.replace('/invoxio/api','');
require('app-module-path').addPath(currentDir);

const testsRouter = require('modules/tests/tests.router');
const healthRouter = require('modules/health/health.router');
const utilsRouter = require('modules/utils/utils.router');

var grpc = require('grpc');
var grpcServer = new grpc.Server();

var baseProto = grpc.load('grpc/base.proto');

var userStream;

// In-memory array of user objects
var users = [{
    id: 123,
    name: 'Jimi Hendrix',
    email: 'Jimi@heaven.org'
}];

grpcServer.addProtoService(baseProto.base.grpcService.service, {
    list: function(call, callback) {
        callback(null, users);
    },
    insert: function(call, callback) {
        var user = call.request;
        users.push(user);
        if (userStream)
            userStream.write(user);
        callback(null, {});
    },
    get: function(call, callback) {
        for (var i = 0; i < users.length; i++)
            if (users[i].id == call.request.id)
                return callback(null, users[i]);
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    delete: function(call, callback) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == call.request.id) {
                users.splice(i, 1);
                return callback(null, {});
            }
        }
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    watch: function(stream) {
        userStream = stream;
    }
});

grpcServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
grpcServer.start();
console.log(`grpcServer started on: 0.0.0.0:50051`.yellow)


// var Logger = require('./lib/utils/logger');
// var logger = new Logger();

var restify = require('restify');

//var hostip = tools.network.getHostIP();
var port = '7007';
var hostip = '0.0.0.0';
var server = restify.createServer();

server.server.setTimeout(60000*5);
server.use(restify.CORS());

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

server.use(restify.gzipResponse());
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.authorizationParser());

server.use(function authenticate(req, res, next) {

    // console.log(`auth: ${req.username} ${req.authorization.basic.password}`);
    //req.body.custid= req.user
    return next();
    //return next(new restify.NotAuthorizedError());
    // myPretendDatabaseClient.lookup(req.username, function (err, user) {
    //     if (err) return next(err);
    //
    //     if (user.password !== req.authorization.basic.password)
    //         return next(new restify.NotAuthorizedError());
    //
    //     return next();
    // });
});

// Refactor params to be case insensitive
server.use(function(req, res, next) {
  for (var key in req.query)
  {
    if (req.query[key.toLowerCase()] != req.query[key]) {
        req.query[key.toLowerCase()] = req.query[key];
        delete req.query[key];
    }
  }
  next();
});

testsRouter.applyRoutes(server, '/tests');
healthRouter.applyRoutes(server, '/health');
utilsRouter.applyRoutes(server, '/');

// This is for docs
// server.get(/.*/, restify.serveStatic({
//     directory: __dirname  + '/docs/server/build/.',
//     default: 'index.html'
// }));
// 

server.listen(port, hostip, function() {
    console.log(`Store API listening at ${server.url}`.yellow);
});
