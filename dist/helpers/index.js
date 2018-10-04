"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const idToString = exports.idToString = doc => {
  doc._id = doc._id.toString();
  return doc;
};