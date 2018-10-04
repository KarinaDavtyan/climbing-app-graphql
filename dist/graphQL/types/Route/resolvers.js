'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Route: {
    name: async (root, args) => {
      const route = await _db2.default.getRoute({ _id: args._id });
      return route;
    }
  }
};

exports.default = resolvers;