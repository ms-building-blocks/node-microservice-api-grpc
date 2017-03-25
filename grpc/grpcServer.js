"use strict";

var colors = require('colors');
var grpc = require('grpc');

const start = function(serverIP, serverPort) {
    
    const hostip =  serverIP === undefined ? '0.0.0.0' : serverIP ;
    const port =  serverPort === undefined ? '50051' : serverPort ;
    
    var grpcServer = new grpc.Server();
    var baseProto = grpc.load('grpc/base.proto');
    // In-memory array of user objects
    
    var userStream;
    
    var users = [
        {
            id: 123,
            name: 'Jimi Hendrix',
            email: 'Jimi@heaven.org'
        }
    ];

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
        callback({code: grpc.status.NOT_FOUND, details: 'Not found'});
        },
        delete: function(call, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == call.request.id) {
                    users.splice(i, 1);
                    return callback(null, {});
                }
            }
            callback({code: grpc.status.NOT_FOUND, details: 'Not found'});
        },
        watch: function(stream) {
            userStream = stream;
        }
    });

    grpcServer.bind(`${hostip}:${port}`, grpc.ServerCredentials.createInsecure());
    grpcServer.start();
    
    console.log(`grpcServer started on: ${hostip}:${port}`.yellow)
};

module.exports.start = start;
