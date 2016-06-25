"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mapObject = exports.mapObject = function mapObject(obj, funct) {
  return Object.keys(obj).reduce(function (previous, key, index) {
    previous[key] = funct(obj[key], key, index);
    return previous;
  }, {});
};