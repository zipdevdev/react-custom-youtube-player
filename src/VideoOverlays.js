import React from 'react';
import defaultStyles from './defaultStyles';

const VideoOverlay = (props) => (
  <div style={defaultStyles.videoOverlay}>
    {props.children}
  </div>
);

const ButtonOverlay = (props) => (
  <figure style={defaultStyles.playButtonWrapper}>
    <button style={defaultStyles.playButton}>
      {props.children}
    </button>
  </figure>
);

VideoOverlay.propTypes = {
  children: React.PropTypes.node.isRequired,
};

ButtonOverlay.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default VideoOverlay;

export { ButtonOverlay };
