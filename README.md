# node-microservice-api-grpc

## NOTICE
This is a big time early work.  We are posting at this early stage as we could not find anything that met our needs.  It is here <b>STRICTLY</b> for review and we <b>HIGHLY</b> advise not to use this <b>ANYWHERE NEAR PRODUCTION</b>.

We are very interested in thoughts or comments though.

Intentions are great things.  Well, we INTEND to actively add to this as we are building out a large kubernetes stack and this (for now) is our boilerplate for the services.  Stay tuned for rapid updates.

## Requirements

The initial requirements were:

*  Node.js based
*  Initial rest based API for external access (if needed)
*  gRPC for inter services communications.
*  GraphQL for API enhancements.   (Planned)

## Getting Started

Git clone this repo onto your local drive.
yarn or npm install.

### Prerequisites

* Node > 7

## Running the tests

No tests currently.  Stay tuned.  

There are examples.  See the API section and the gRPC section.

## Deployment

This is being designed and meant for kubernetes clusters.   We will be adding detailed documentation for running on docker and kubernetes.

## Structure

The code should be pretty easy to follow.  The gRPC is under the grpc folder and the restify api server is under the api server.

### gRPC
We have built a gRPC client example in the /examples/grpc folder.  The code is self-explanatory we hope.  Works in conjuntions with the grpcServer in the /grpc folder.

```
node client list
node client add
node client insert 1 Bob bob@here.com
node client get 123
node client delete 1
node client watch # Run in seperate terminal will push new users to screen
```



### API
There are two current API endpoints:

A basic health check

```
curl http://0.0.0.0:7007/health
```

Get the base.proto file for client gRPC creating (We are wondering why the proto file is not loadd dynamically from the server, but hey we are new to this also).

```
curl http://0.0.0.0:7007/proto
```

## TODO
* testing 
* ops integrations for monitoring 
* docker files
* kubernetes files
* the kitchen sink

## Contributing

We are interested in contributors.  If you feel some passion for a project like this.  Drop us a line.


## Authors

* **Timothy Meade**  [Email](mailto:tim@invoxio.com) [GitHub](https://github.com/Invoxio) [Web](https://www.invoxio.com) 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to @mxstbr and everyone who worked on react-boilerplate.  Great inspiration.
* The node.js community
* And all the new friends in the kubernetes groups.

