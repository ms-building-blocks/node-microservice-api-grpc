var grpc = require('grpc');
var baseProto = grpc.load('../../grpc/base.proto');

var client = new baseProto.base.grpcService('0.0.0.0:50051', grpc.credentials.createInsecure());

function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log(JSON.stringify(response, undefined, 2))
}

function listUsers() {
    client.list({}, function(error, users) {
        printResponse(error, users);
    });
}

function insertUser(id, name, email) {
    var user = {
        id: parseInt(id),
        name: name,
        email: email
    };
    client.insert(user, function(error, empty) {
        printResponse(error, empty);
    });
}

function getUser(id) {
    client.get({
        id: parseInt(id)
    }, function(error, user) {
        printResponse(error, user);
    });
}

function deleteUser(id) {
    client.delete({
        id: parseInt(id)
    }, function(error, empty) {
        printResponse(error, empty);
    });
}

function watchUsers() {
    var call = client.watch({});
    call.on('data', function(user) {
        console.log(user);
    });
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == 'list')
    listUsers();
else if (command == 'insert')
    insertUser(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
    getUser(process.argv[0]);
else if (command == 'delete')
    deleteUser(process.argv[0]);
else if (command == 'watch')
    watchUsers();
