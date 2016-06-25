'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XpathUtils = function () {
  function XpathUtils() {
    _classCallCheck(this, XpathUtils);
  }

  _createClass(XpathUtils, [{
    key: 'concat',
    value: function concat(array) {
      return array.join(' | ');
    }
  }, {
    key: 'extractTag',
    value: function extractTag() {
      var tags = arguments.length <= 0 || arguments[0] === undefined ? '*' : arguments[0];

      return Array.isArray(tags) ? '{{' + tags.join(',') + '}}' : tags;
    }
  }, {
    key: 'getRequest',
    value: function getRequest() {
      var _this = this;

      var memo = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      return (0, _utils.mapObject)(_query2.default, function (_, key) {
        return function () {
          for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
          }

          return _this.beforeRequest.apply(_this, [key, memo].concat(props));
        };
      });
    }
  }, {
    key: 'beforeRequest',
    value: function beforeRequest(key, memo) {
      for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        params[_key2 - 2] = arguments[_key2];
      }

      var _this2 = this;

      params = params.map(function (param) {
        return _this2.extractTag(param);
      });
      return this.request(_query2.default[key].apply(_query2.default, _toConsumableArray(params)), memo);
    }
  }, {
    key: 'done',
    value: function done(request) {
      var regex = /{{(.+?)}}/;
      var findArray = request.match(/{{(.+?)}}/g) || [];

      if (findArray.length) {
        return this.concat(findArray.reduce(function (memo, array) {
          var _regex$exec = regex.exec(array);

          var _regex$exec2 = _slicedToArray(_regex$exec, 2);

          var table = _regex$exec2[1];

          return memo.reduce(function (m, req) {
            return m.concat(table.split(',').map(function (tag) {
              return req.replace(regex, tag);
            }));
          }, []);
        }, [request]));
      }

      return request;
    }
  }, {
    key: 'request',
    value: function request() {
      var _this3 = this;

      var _request = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];

      var memo = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      memo += _request;
      return _extends({}, this.getRequest(memo), {
        done: function done() {
          return _this3.done(memo);
        }
      });
    }
  }]);

  return XpathUtils;
}();

exports.default = XpathUtils;