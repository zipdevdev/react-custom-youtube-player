import React from 'react';
import defaultStyles from './defaultStyles';

const   mergeObjects = (defaultObject, newObject) => (
  Object.assign({}, defaultObject, newObject)
);
const VideoOverlay = (props) => (
  <div style={mergeObjects(defaultStyles.videoOverlay, props.style)}>
    {props.children}
  </div>
);

const ButtonOverlay = (props) => (
  <button style={mergeObjects(defaultStyles.playButton, props.style)}>
    {props.children}
  </button>
);

VideoOverlay.propTypes = {
  children: React.PropTypes.node.isRequired,
  style: React.PropTypes.object,
};

ButtonOverlay.propTypes = {
  children: React.PropTypes.node.isRequired,
  style: React.PropTypes.object,
};

export default VideoOverlay;

export { ButtonOverlay, mergeObjects };
