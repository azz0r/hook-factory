"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _index = require("./src/index");

var _index2 = _interopRequireDefault(_index);

var _modifiers = require("./test/modifiers");

var _modifiers2 = _interopRequireDefault(_modifiers);

var _fixtures = require("./fixtures");

var _fixtures2 = _interopRequireDefault(_fixtures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http2.default.createServer(function (req, res) {
  try {
    (0, _index2.default)({ modifiers: _modifiers2.default, data: _fixtures2.default });
  } catch (error) {
    console.log(error);
  }
}).listen(1337, "127.0.0.1");

console.log("Server running");