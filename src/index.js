require('dotenv').config()

import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { importSchema } from 'graphql-import'

import typeDefs from './graphQL/types/index.graphql';
import resolvers from './graphQL/resolvers/index.js';

const app = new Koa();
const server = new ApolloServer({ typeDefs, resolvers });
const port = 4000;

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
