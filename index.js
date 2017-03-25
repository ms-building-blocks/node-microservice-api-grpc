

require('app-module-path').addPath(__dirname);

const grpcServer = require('grpc/grpcServer');
const apiServer = require('api/apiServer');

grpcServer.start('0.0.0.0', 50051);
apiServer.start('0.0.0.0', 7007);

