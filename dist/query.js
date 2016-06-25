"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var query = {
  tag: function tag(_tag) {
    return "/" + _tag;
  },
  findByText: function findByText(text, tag) {
    return "/" + tag + "[text()=\"" + text + "\"]";
  },
  findByTextContent: function findByTextContent(text, tag) {
    return "/" + tag + "[contains(.,\"" + text + "\")]";
  },
  following: function following(tag) {
    return "/following::" + tag;
  },
  select: function select(num) {
    return "[" + num + "]";
  },
  first: function first() {
    return "[1]";
  },
  last: function last() {
    return "[last()]";
  },
  all: function all() {
    return "/*";
  },
  attribute: function attribute(attr) {
    return "[@" + attr + "]";
  },
  custom: function custom(str) {
    return str;
  }
};

exports.default = query;