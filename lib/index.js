'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyles = require('./defaultStyles');

var _defaultStyles2 = _interopRequireDefault(_defaultStyles);

var _reactYoutube = require('react-youtube');

var _reactYoutube2 = _interopRequireDefault(_reactYoutube);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _VideoOverlays = require('./VideoOverlays');

var _VideoOverlays2 = _interopRequireDefault(_VideoOverlays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YouTubeCustomPlayer = function (_Component) {
  _inherits(YouTubeCustomPlayer, _Component);

  function YouTubeCustomPlayer(props) {
    _classCallCheck(this, YouTubeCustomPlayer);

    var _this = _possibleConstructorReturn(this, (YouTubeCustomPlayer.__proto__ || Object.getPrototypeOf(YouTubeCustomPlayer)).call(this, props));

    _this.state = {
      click: false,
      player: null,
      state: _reactYoutube2.default.PlayerState.UNSTARTED,
      interval: -1,
      currentTime: 0
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.onReadyPlayer = _this.onReadyPlayer.bind(_this);
    _this.handlePlayerState = _this.handlePlayerState.bind(_this);
    _this.timer = _this.timer.bind(_this);
    _this.handleSeek = _this.handleSeek.bind(_this);
    return _this;
  }

  _createClass(YouTubeCustomPlayer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.interval);
    }
  }, {
    key: 'onReadyPlayer',
    value: function onReadyPlayer(event) {
      this.setState({ player: event.target });
    }
  }, {
    key: 'getFormatedMinutes',
    value: function getFormatedMinutes() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var strPadLeft = function strPadLeft(string) {
        return (new Array(3).join(0) + string).slice(-2);
      };
      var mins = ~~(time / 60);
      var secs = Math.round(time % 60);
      return mins + ':' + strPadLeft(secs);
    }
  }, {
    key: 'timer',
    value: function timer() {
      var time = this.state.time;

      if (time && new Date().getTime() - time >= 1000) {
        this.setState({ time: false, currentTime: this.state.player.getCurrentTime() });
      } else {
        this.setState({ currentTime: this.state.player.getCurrentTime() });
      }
    }
  }, {
    key: 'handlePlayerState',
    value: function handlePlayerState(event) {
      var _state = this.state,
          state = _state.state,
          interval = _state.interval;

      if (state === _reactYoutube2.default.PlayerState.UNSTARTED && event.data === _reactYoutube2.default.PlayerState.PLAYING && interval === -1) {
        this.setState({ interval: setInterval(this.timer, 100), state: event.data });
      } else if (state === _reactYoutube2.default.PlayerState.PLAYING && event.data === _reactYoutube2.default.PlayerState.PAUSED || state === _reactYoutube2.default.PlayerState.PAUSED && event.data === _reactYoutube2.default.PlayerState.PLAYING) {
        this.setState({
          state: event.data,
          paused: event.data === _reactYoutube2.default.PlayerState.PAUSED,
          time: new Date().getTime()
        });
      } else {
        this.setState({ state: event.data });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.setState({ click: value });
    }
  }, {
    key: 'handleSeek',
    value: function handleSeek(value) {
      this.state.player.seekTo(value);
    }
  }, {
    key: 'mergeStyles',
    value: function mergeStyles(defaultStyle, newStyle) {
      return Object.assign({}, defaultStyle, newStyle);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          videoId = _props.videoId,
          replayButton = _props.replayButton;
      var _state2 = this.state,
          click = _state2.click,
          player = _state2.player,
          state = _state2.state,
          currentTime = _state2.currentTime,
          paused = _state2.paused,
          time = _state2.time;

      var playButton = _react2.default.createElement(
        _VideoOverlays.ButtonOverlay,
        null,
        _react2.default.createElement('div', { style: _defaultStyles2.default.playButtonAfter })
      );
      var pauseButton = _react2.default.createElement(
        _VideoOverlays.ButtonOverlay,
        null,
        _react2.default.createElement('div', { style: _defaultStyles2.default.pauseButton })
      );
      var thumbnail = _react2.default.createElement('img', {
        style: _defaultStyles2.default.img,
        src: 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg',
        role: 'presentation'
      });
      return _react2.default.createElement(
        'div',
        { style: _defaultStyles2.default.wrapper },
        !click ? _react2.default.createElement(
          'div',
          { onClick: this.handleClick },
          thumbnail,
          _react2.default.createElement(
            _VideoOverlays2.default,
            null,
            playButton
          )
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            {
              style: state !== _reactYoutube2.default.PlayerState.ENDED ? _defaultStyles2.default.hiddenObject : null,
              onClick: function onClick() {
                return _this2.handleSeek(0);
              }
            },
            thumbnail,
            _react2.default.createElement(
              _VideoOverlays2.default,
              null,
              _react2.default.createElement(
                _VideoOverlays.ButtonOverlay,
                null,
                replayButton || 'Replay'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            {
              style: Object.assign({}, _defaultStyles2.default.iframe, state === _reactYoutube2.default.PlayerState.ENDED ? _defaultStyles2.default.hiddenObject : null)
            },
            _react2.default.createElement(_reactYoutube2.default, {
              videoId: videoId,
              id: 'player',
              opts: {
                playerVars: {
                  controls: 0,
                  enablejsapi: 1,
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  autoplay: 1,
                  iv_load_policy: 3
                },
                width: '100%',
                height: '100%'
              },
              onReady: this.onReadyPlayer,
              onStateChange: this.handlePlayerState
            }),
            _react2.default.createElement(
              _VideoOverlays2.default,
              null,
              !paused && time ? playButton : null,
              paused && time ? pauseButton : null
            ),
            player ? _react2.default.createElement(
              'div',
              { style: _defaultStyles2.default.controlsBar },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Slider2.default, {
                  min: 0,
                  max: player.getDuration(),
                  value: currentTime,
                  onChange: this.handleSeek
                })
              ),
              _react2.default.createElement(
                'div',
                { style: _defaultStyles2.default.controlsBarButtons },
                state === 1 ? _react2.default.createElement(
                  'span',
                  { style: { fontSize: '11px' }, onClick: function onClick() {
                      return player.pauseVideo();
                    } },
                  '\u258D\u258D'
                ) : _react2.default.createElement(
                  'span',
                  { onClick: function onClick() {
                      return player.playVideo();
                    } },
                  '\u25BA'
                ),
                _react2.default.createElement(
                  'div',
                  { style: { float: 'right' } },
                  this.getFormatedMinutes(currentTime),
                  ' /',
                  this.getFormatedMinutes(player.getDuration())
                )
              )
            ) : null
          )
        )
      );
    }
  }]);

  return YouTubeCustomPlayer;
}(_react.Component);

YouTubeCustomPlayer.propTypes = {
  videoId: _react2.default.PropTypes.string.isRequired,
  replayButton: _react2.default.PropTypes.object
};

exports.default = YouTubeCustomPlayer;