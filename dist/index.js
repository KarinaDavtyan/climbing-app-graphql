'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _apolloServerKoa = require('apollo-server-koa');

var _schema = require('./graphQL/schema.js');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const app = new _koa2.default();
const server = new _apolloServerKoa.ApolloServer({ schema: _schema2.default });
const port = process.env.PORT || 4000;

server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));