import React, { Component } from 'react';
import defaultStyles from './defaultStyles';
import YoutubePlayer from 'react-youtube';
import RangeSlider from './Slider';
import VideoOverlay, { ButtonOverlay } from './VideoOverlays';

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
  }
  handleClick(value = true) {
    this.setState({ click: value });
  }
  handleSeek(value) {
    this.state.player.seekTo(value);
  }
  mergeStyles(defaultStyle, newStyle) {
    return Object.assign({}, defaultStyle, newStyle);
  }
  render() {
    const { videoId, replayButton } = this.props;
    const { click, player, state, currentTime, paused, time } = this.state;
    const playButton = (<ButtonOverlay>
      <div style={defaultStyles.playButtonAfter} />
    </ButtonOverlay>);
    const pauseButton = (<ButtonOverlay>
      <div style={defaultStyles.pauseButton} />
    </ButtonOverlay>);
    const thumbnail = (<img
      style={defaultStyles.img}
      src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
      role="presentation"
    />);
    return (
      <div style={defaultStyles.wrapper}>
        {!click ?
          <div onClick={this.handleClick}>
            {thumbnail}
            <VideoOverlay>
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
              <VideoOverlay>
                <ButtonOverlay>
                    {replayButton || 'Replay'}
                </ButtonOverlay>
              </VideoOverlay>
            </div>
            <div
              style={Object.assign({}, defaultStyles.iframe,
                state === YoutubePlayer.PlayerState.ENDED ?
                defaultStyles.hiddenObject : null)}
            >
              <YoutubePlayer
                videoId={videoId}
                id={'player'}
                opts={{
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
                }}
                onReady={this.onReadyPlayer}
                onStateChange={this.handlePlayerState}
              />
              <VideoOverlay>
                {!paused && time ? playButton : null}
                {paused && time ? pauseButton : null}
              </VideoOverlay>
              {player ?
                <div style={defaultStyles.controlsBar}>
                  <div>
                    <RangeSlider
                      min={0}
                      max={player.getDuration()}
                      value={currentTime}
                      onChange={this.handleSeek}
                    />
                  </div>
                  <div style={defaultStyles.controlsBarButtons}>
                    {state === 1 ?
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
};

export default YouTubeCustomPlayer;
