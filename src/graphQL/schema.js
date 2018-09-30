import { makeExecutableSchema } from 'graphql-tools';
import types from './types/main.graphql';
import resolvers from './resolvers';
import { importSchema } from 'graphql-import'

const typeDefs = importSchema(types)

export default makeExecutableSchema({ typeDefs, resolvers });
