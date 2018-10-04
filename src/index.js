require('dotenv').config()

import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';

import schema from './graphQL/schema.js';

const app = new Koa();
const server = new ApolloServer({ schema });
const port = process.env.PORT || 4000;

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
