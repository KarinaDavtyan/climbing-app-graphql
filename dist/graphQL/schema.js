'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _graphqlImport = require('graphql-import');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* babel-plugin-inline-import './types/main.graphql' */const types = '# import * from "src/graphQL/types/ClimbingArea/type.graphql"\n# import * from "src/graphQL/types/Route/type.graphql"\n# import User from "src/graphQL/types/User/type.graphql"\n# import * from "src/graphQL/types/Post/type.graphql"\n\nschema {\n  query: Query\n}\ntype Query {\n  user(_id: ID!): User #id username\n  route(_id: ID!): Route\n  climbing_area(_id: ID, name: String): ClimbingArea #country #distance_from_user*\n  all_climbing_areas: [ClimbingArea]\n  sport_posts(_id: ID, user_id: ID, route_id: ID): [SportPost]\n  leisure_posts(_id: ID, user_id: ID): [LeisurePost]\n  sport_post(_id: ID!): SportPost\n  all_sport_posts: [SportPost]\n  leisure_post(_id: ID!): LeisurePost\n}\n\ntype Mutation {\n  createUser(user: PostUser): CreateUserMutationResponse\n  createRoute(route: PostRoute): CreateRouteMutationResponse\n  deleteRoute(_id: ID!): DeleteRouteMutationResponse\n  createClimbingArea(climbing_area: PostClimbingArea): CreateClimbingAreaMutationResponse\n  deleteClimbingArea(_id: ID!): DeleteClimbingAreaMutationResponse\n  createLeisurePost(post: SubmitLeisurePost): CreateLeisurePostMutationResponse\n  createSportPost(post: SubmitSportPost): CreateSportPostMutationResponse\n}\n';


const typeDefs = (0, _graphqlImport.importSchema)(types);

exports.default = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers: _resolvers2.default });