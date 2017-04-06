'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObjects = exports.ButtonOverlay = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyles = require('./defaultStyles');

var _defaultStyles2 = _interopRequireDefault(_defaultStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeObjects = function mergeObjects(defaultObject, newObject) {
  return Object.assign({}, defaultObject, newObject);
};
var VideoOverlay = function VideoOverlay(props) {
  return _react2.default.createElement(
    'div',
    { style: mergeObjects(_defaultStyles2.default.videoOverlay, props.style) },
    props.children
  );
};

var ButtonOverlay = function ButtonOverlay(props) {
  return _react2.default.createElement(
    'button',
    { style: mergeObjects(_defaultStyles2.default.playButton, props.style) },
    props.children
  );
};

VideoOverlay.propTypes = {
  children: _react2.default.PropTypes.node.isRequired,
  style: _react2.default.PropTypes.object
};

ButtonOverlay.propTypes = {
  children: _react2.default.PropTypes.node.isRequired,
  style: _react2.default.PropTypes.object
};

exports.default = VideoOverlay;
exports.ButtonOverlay = ButtonOverlay;
exports.mergeObjects = mergeObjects;