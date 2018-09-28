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

/***/ "./src/graphQL/resolvers.js":
/*!**********************************!*\
  !*** ./src/graphQL/resolvers.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const resolvers = {
  Query: {
    route:()=> {
      return {
        title: 'title',
        location: {
          lat: 1,
          lon: 2
        }
      }
    },
    routes: () => {
      return [{
        title: 'title',
        location: {
          lat: 1,
          lon: 2
        }
      },{
        title: 'title2',
        location: {
          lat: 1,
          lon: 2
        }
      }
    ]
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

module.exports = "type Query {\n  route: Route\n  routes: [Route]\n}\n\ntype Route {\n  id: ID\n  title: String\n  location: Location\n}\n\ntype Location {\n  lat: Int\n  lon: Int\n}\n"

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

/***/ })

/******/ });
//# sourceMappingURL=main.js.map