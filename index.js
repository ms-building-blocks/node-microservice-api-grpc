

require('app-module-path').addPath(__dirname);

const grpcServer = require('grpc/grpcServer');
const apiServer = require('api/apiServer');

grpcServer.start();
apiServer.start();

