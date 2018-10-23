require('dotenv').config()

import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import passport from 'koa-passport';
// import { Strategy } from 'passport-local';
const Strategy = require('passport-local').Strategy;
import bodyParser from 'koa-bodyparser';
const router = require('koa-router')();
import session from 'koa-session';
const koaJWT = require('koa-jwt');
import jwt from 'jsonwebtoken';


import schema from './graphQL/schema.js';
import { loginUser, getUser } from './db';


import types from './graphQL/types/main.graphql';
import resolvers from './graphQL/resolvers';
import { importSchema } from 'graphql-import'

const typeDefs = importSchema(types)

const app = new Koa();
const port = process.env.PORT || 4000;


app.use(bodyParser());

app.use(koaJWT({ secret: process.env.JWT_SECRET }).unless({ path: ['/login', '/graphql'] }));

app.use(async (ctx, next) => {
  // Getting the content of authorization header and
  // setting ctx.user to be the user binded to the token
  if (ctx.headers['authorization']) {
    const authorization = ctx.headers['authorization'];
    const [strategy, token] = authorization.split(' ');
    if(strategy !== 'Bearer') return await next();
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenData);
    const user = await getUser({ username: tokenData.username });

    //user we access as schema context
    ctx.user = user
    await next();
  } else {
    await next();
  }
})

router.post('/login', async (ctx) => {
  const auth = ctx.request.headers.authorization;
  const base64 = auth.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString("ascii");
  const [username, password] = decoded.split(':');
  const loginedUser = await loginUser(username, password);
  if (loginedUser) {
    ctx.body = {
        "token": loginedUser.token,
        "user": loginedUser.user
      }
    ctx.status = 200;
  } else {
    ctx.status = 401
  }

});

app.use(router.routes())


const server = new ApolloServer({ typeDefs, resolvers, context: ({ ctx }) => ctx });
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
