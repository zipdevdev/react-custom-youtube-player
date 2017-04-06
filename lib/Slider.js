'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyles = require('./defaultStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangeSlider = function (_Component) {
  _inherits(RangeSlider, _Component);

  function RangeSlider(props) {
    _classCallCheck(this, RangeSlider);

    var _this = _possibleConstructorReturn(this, (RangeSlider.__proto__ || Object.getPrototypeOf(RangeSlider)).call(this, props));

    _this.state = {
      fillWidth: (_this.props.value - _this.props.min) / (_this.props.max - _this.props.min) * 100,
      value: _this.props.value,
      mouseX: 0,
      mouseDown: false
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    return _this;
  }

  _createClass(RangeSlider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.mouseDown) return;
      this.setState({
        fillWidth: (nextProps.value - nextProps.min) / (nextProps.max - nextProps.min) * 100,
        value: nextProps.value
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var rect = this.refs.container.getBoundingClientRect();
      var percentage = (e.pageX - rect.left) / rect.width;

      if (this.props.type === 'float') {
        var value = this.props.min + percentage * this.props.max;
        this.setState({
          fillWidth: percentage * 100,
          value: value,
          mouseX: rect.left + (e.pageX - rect.left)
        });
        if (this.props.onChange) {
          this.props.onChange(value);
        }
      } else {
        var _value = Math.round(this.props.min + percentage * this.props.max);
        var intPercentage = _value / (this.props.max - this.props.min) * 100;

        this.setState({
          fillWidth: intPercentage,
          value: _value,
          mouseX: rect.left + (e.pageX - rect.left)
        });
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      this.setState({ mouseDown: true });
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.setState({ mouseDown: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      if (this.state.mouseDown) {
        this.handleClick(e);
      }
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ mouseEnter: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave(e) {
      if (this.state.mouseDown) {
        this.handleClick(e);
        this.setState({ mouseDown: false, mouseEnter: false });
      } else {
        this.setState({ mouseEnter: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          barStyle = _props.barStyle,
          barFillStyle = _props.barFillStyle,
          barHandlerStyle = _props.barHandlerStyle;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          {
            style: _defaultStyles.sliderStyles.container,
            ref: 'container',
            onClick: this.handleClick,
            onMouseUp: this.handleMouseUp,
            onMouseMove: this.handleMouseMove,
            onMouseLeave: this.handleMouseLeave,
            onMouseDown: this.handleMouseDown,
            onMouseEnter: this.handleMouseEnter
          },
          _react2.default.createElement('div', {
            style: Object.assign({}, _defaultStyles.sliderStyles.slideBar, barStyle, this.state.mouseEnter ? _defaultStyles.sliderStyles.slideBarMouseEnter : {})
          }),
          _react2.default.createElement('div', {
            style: Object.assign({}, _defaultStyles.sliderStyles.slideBar, _defaultStyles.sliderStyles.slideBarFill, barFillStyle, this.state.mouseEnter ? _defaultStyles.sliderStyles.slideBarMouseEnter : {}, { width: this.state.fillWidth + '%' })
          }),
          _react2.default.createElement('div', {
            style: Object.assign({}, _defaultStyles.sliderStyles.handleButton, barHandlerStyle, { left: this.state.fillWidth + '%' })
          })
        )
      );
    }
  }]);

  return RangeSlider;
}(_react.Component);

RangeSlider.propTypes = {
  min: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number.isRequired,
  value: _react2.default.PropTypes.number.isRequired,
  onChange: _react2.default.PropTypes.func,
  type: _react2.default.PropTypes.string,
  barStyle: _react2.default.PropTypes.object,
  barFillStyle: _react2.default.PropTypes.object,
  barHandlerStyle: _react2.default.PropTypes.object
};
RangeSlider.defaultProps = {
  min: 0,
  type: 'float'
};
exports.default = RangeSlider;