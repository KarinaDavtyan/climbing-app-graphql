/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/db/index.js":
/*!*************************!*\
  !*** ./src/db/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { idToString } = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
const { MongoClient } = __webpack_require__(/*! mongodb */ "mongodb");
const url = 'mongodb://localhost:27017/climbing-app';
const dbName = 'climbing-app';


const postRoute = async ({ data }) => {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const routes = db.collection('routes');

    const { _id, title, location } = data;

    const route = routes.insert({
      title
    })
    return route;
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}

const getRoutes = async () => {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const routes = db.collection('routes');



    let routesArray = await routes.find().limit(10).toArray();
    const routesWithStrID = routesArray.map(idToString);
    return routesWithStrID;
  } catch (err) {
    //eslint-disable-next-line
    console.log(err.stack);
  }
  client.close();
}



module.exports = {
  postRoute,
  getRoutes
}


/***/ }),

/***/ "./src/graphQL/resolvers.js":
/*!**********************************!*\
  !*** ./src/graphQL/resolvers.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db */ "./src/db/index.js");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_db__WEBPACK_IMPORTED_MODULE_0__);


const resolvers = {
  Query: {
    route:()=> {
      return {
        title: 'title'
      }
    },
    routes: async () => {
      const routes = await _db__WEBPACK_IMPORTED_MODULE_0___default.a.getRoutes();
      return routes
    }
  },
  Mutation: {
    postRoute: async (root, args) => {
      const data = {
        title: args.title
      }
      await _db__WEBPACK_IMPORTED_MODULE_0___default.a.postRoute({ data })
      return {
        data
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (resolvers);


/***/ }),

/***/ "./src/graphQL/types/index.graphql":
/*!*****************************************!*\
  !*** ./src/graphQL/types/index.graphql ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Query {\n  route: Route\n  routes: [Route]\n}\n\ntype Mutation {\n  postRoute(title: String!): Route\n}\n\ntype Route {\n  _id: ID\n  title: String\n}\n"

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! exports provided: idToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idToString", function() { return idToString; });
const idToString = (doc) => {
  doc._id = doc._id.toString()
  return doc;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_koa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-koa */ "apollo-server-koa");
/* harmony import */ var apollo_server_koa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_koa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_import__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-import */ "graphql-import");
/* harmony import */ var graphql_import__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_import__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphQL_types_index_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphQL/types/index.graphql */ "./src/graphQL/types/index.graphql");
/* harmony import */ var _graphQL_types_index_graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_graphQL_types_index_graphql__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphQL_resolvers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQL/resolvers.js */ "./src/graphQL/resolvers.js");







const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();
const server = new apollo_server_koa__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"]({ typeDefs: (_graphQL_types_index_graphql__WEBPACK_IMPORTED_MODULE_3___default()), resolvers: _graphQL_resolvers_js__WEBPACK_IMPORTED_MODULE_4__["default"] });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);


/***/ }),

/***/ "apollo-server-koa":
/*!************************************!*\
  !*** external "apollo-server-koa" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-koa");

/***/ }),

/***/ "graphql-import":
/*!*********************************!*\
  !*** external "graphql-import" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-import");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map