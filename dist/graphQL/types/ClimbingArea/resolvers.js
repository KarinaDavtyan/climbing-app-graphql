"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const resolvers = {
  ClimbingArea: {
    routes: async climbing_area => {
      return climbing_area.routes;
    }
  }
};

exports.default = resolvers;