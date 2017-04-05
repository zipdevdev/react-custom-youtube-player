'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonOverlay = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyles = require('./defaultStyles');

var _defaultStyles2 = _interopRequireDefault(_defaultStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoOverlay = function VideoOverlay(props) {
  return _react2.default.createElement(
    'div',
    { style: _defaultStyles2.default.videoOverlay },
    props.children
  );
};

var ButtonOverlay = function ButtonOverlay(props) {
  return _react2.default.createElement(
    'figure',
    { style: _defaultStyles2.default.playButtonWrapper },
    _react2.default.createElement(
      'button',
      { style: _defaultStyles2.default.playButton },
      props.children
    )
  );
};

VideoOverlay.propTypes = {
  children: _react2.default.PropTypes.node.isRequired
};

ButtonOverlay.propTypes = {
  children: _react2.default.PropTypes.node.isRequired
};

exports.default = VideoOverlay;
exports.ButtonOverlay = ButtonOverlay;