import React, { Component } from 'react';
import defaultStyles from './defaultStyles';
import YoutubePlayer from 'react-youtube';
import RangeSlider from './Slider';
import VideoOverlay, { ButtonOverlay, mergeObjects } from './VideoOverlays';

class YouTubeCustomPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      player: null,
      state: YoutubePlayer.PlayerState.UNSTARTED,
      interval: -1,
      currentTime: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onReadyPlayer = this.onReadyPlayer.bind(this);
    this.handlePlayerState = this.handlePlayerState.bind(this);
    this.timer = this.timer.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  onReadyPlayer(event) {
    this.setState({ player: event.target });
    if (this.props.onReady) {
      this.props.onReady(event);
    }
  }
  getFormatedMinutes(time = 0) {
    const strPadLeft = (string) => (new Array(3).join(0) + string).slice(-2);
    const mins = ~~(time / 60);
    const secs = Math.round(time % 60);
    return `${mins}:${strPadLeft(secs)}`;
  }
  timer() {
    const { time } = this.state;
    if (time && new Date().getTime() - time >= 1000) {
      this.setState({ time: false, currentTime: this.state.player.getCurrentTime() });
    } else {
      this.setState({ currentTime: this.state.player.getCurrentTime() });
    }
  }
  handlePlayerState(event) {
    const { state, interval } = this.state;
    if (state === YoutubePlayer.PlayerState.UNSTARTED
      && event.data === YoutubePlayer.PlayerState.PLAYING
      && interval === -1) {
      this.setState({ interval: setInterval(this.timer, 100), state: event.data });
    } else if ((state === YoutubePlayer.PlayerState.PLAYING
      && event.data === YoutubePlayer.PlayerState.PAUSED)
     || (state === YoutubePlayer.PlayerState.PAUSED
       && event.data === YoutubePlayer.PlayerState.PLAYING)) {
      this.setState({
        state: event.data,
        paused: event.data === YoutubePlayer.PlayerState.PAUSED,
        time: new Date().getTime(),
      });
    } else {
      this.setState({ state: event.data });
    }
    if (this.props.onStateChange) {
      this.props.onStateChange(event);
    }
  }
  handleClick(value = true) {
    this.setState({ click: value });
  }
  handleSeek(value) {
    this.state.player.seekTo(value);
  }
  render() {
    const { videoId, replayButton, youtubeOpts, overlayStyle,
    buttonWrapperStyle, controlsBarStyle, sliderBarStyle,
    sliderBarFillStyle, sliderBarHandlerStyle, wrapperStyle } = this.props;
    const { click, player, state, currentTime, paused, time } = this.state;
    const playButton = (<ButtonOverlay style={buttonWrapperStyle}>
      {this.props.playButton || <div style={defaultStyles.playButtonAfter} />}
    </ButtonOverlay>);
    const pauseButton = (<ButtonOverlay style={buttonWrapperStyle}>
        {this.props.pauseButton || <div style={defaultStyles.pauseButton} />}
    </ButtonOverlay>);
    const thumbnail = (<img
      style={defaultStyles.img}
      src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
      role="presentation"
    />);
    const youtubePlayerOpts = mergeObjects({
      playerVars: {
        controls: 0,
        enablejsapi: 1,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        iv_load_policy: 3,
      },
      width: '100%',
      height: '100%',
    }, youtubeOpts);
    return (
      <div style={mergeObjects(defaultStyles.wrapper,wrapperStyle)}>
        {!click ?
          <div onClick={this.handleClick}>
            {thumbnail}
            <VideoOverlay style={overlayStyle}>
              {playButton}
            </VideoOverlay>
          </div> :
          <div>
            <div
              style={state !== YoutubePlayer.PlayerState.ENDED ?
                defaultStyles.hiddenObject : null}
              onClick={() => this.handleSeek(0)}
            >
              {thumbnail}
              <VideoOverlay style={overlayStyle}>
                <ButtonOverlay style={buttonWrapperStyle}>
                    {replayButton || 'Replay'}
                </ButtonOverlay>
              </VideoOverlay>
            </div>
            <div
              style={mergeObjects(defaultStyles.iframe,
                state === YoutubePlayer.PlayerState.ENDED ?
                defaultStyles.hiddenObject : null)}
            >
              <YoutubePlayer
                videoId={videoId}
                id={'player'}
                opts={youtubePlayerOpts}
                onReady={this.onReadyPlayer}
                onStateChange={this.handlePlayerState}
                onPlay={this.props.onPlay}
                onPause={this.props.onPause}
                onEnd={this.props.onEnd}
                onError={this.props.onError}
                onPlaybackRateChange={this.props.onPlaybackRateChange}
                onPlaybackQualityChange={this.props.onPlaybackQualityChange}
              />
            <VideoOverlay style={overlayStyle}>
                {!paused && time ? playButton : null}
                {paused && time ? pauseButton : null}
              </VideoOverlay>
              {player ?
                <div style={mergeObjects(defaultStyles.controlsBar, controlsBarStyle)}>
                  <div>
                    <RangeSlider
                      max={player.getDuration()}
                      value={currentTime}
                      onChange={this.handleSeek}
                      barStyle={sliderBarStyle}
                      barFillStyle={sliderBarFillStyle}
                      barHandlerStyle={sliderBarHandlerStyle}
                    />
                  </div>
                  <div style={defaultStyles.controlsBarButtons}>
                    {state === YoutubePlayer.PlayerState.PLAYING ?
                      <span style={{ fontSize: '11px' }} onClick={() => player.pauseVideo()}>
                        ▍▍
                      </span> :
                      <span onClick={() => player.playVideo()}>►</span>}
                    <div style={{ float: 'right' }}>
                      {this.getFormatedMinutes(currentTime)} /
                       {this.getFormatedMinutes(player.getDuration())}
                    </div>
                  </div>
                </div> : null
              }
            </div>
          </div>
        }
      </div>);
  }
}

YouTubeCustomPlayer.propTypes = {
  videoId: React.PropTypes.string.isRequired,
  replayButton: React.PropTypes.object,
  playButton: React.PropTypes.object,
  pauseButton: React.PropTypes.object,
  youtubeOpts: React.PropTypes.object,
  overlayStyle: React.PropTypes.object,
  onPlay: React.PropTypes.func,
  onPause: React.PropTypes.func,
  onEnd: React.PropTypes.func,
  onError: React.PropTypes.func,
  onStateChange: React.PropTypes.func,
  onPlaybackRateChange: React.PropTypes.func,
  onPlaybackQualityChange: React.PropTypes.func,
  onReady: React.PropTypes.func,
  onStateChange: React.PropTypes.func,
};

export default YouTubeCustomPlayer;
