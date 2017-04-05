'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultStyles = {
  playButton: {
    /*  minHeight: '15vh',
      maxWidth: '15vh',
      */
    backgroundColor: '#F39C12',
    borderRadius: '100%',
    height: '72px',
    width: '72px',
    left: '50%',
    top: '50%',
    marginLeft: '-36px',
    marginTop: '-36px',
    position: 'absolute',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'center',
    color: 'white',
    paddingTop: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.75) 7px 17px 60px -12px'
  },
  playButtonWrapper: {
    background: '#F39C12'
  },
  playButtonAfter: {
    display: 'inline-block',
    width: '12px',
    height: '16px',
    borderTop: '8px solid transparent',
    borderLeft: '12px solid #fff',
    borderBottom: '8px solid transparent',
    marginLeft: '2px'
  },
  pauseButton: {
    width: '12px',
    height: '16px',
    borderRight: '4px solid #fff',
    borderLeft: '4px solid #fff',
    display: 'inline-block'
  },
  img: {
    bottom: '0',
    display: 'block',
    left: '0',
    margin: 'auto',
    maxWidth: '100%',
    width: '100%',
    position: 'absolute',
    right: '0',
    top: '0',
    border: 'none',
    height: 'auto',
    cursor: 'pointer',
    transition: '.4s all'
  },
  wrapper: {
    position: 'relative',
    paddingBottom: '56.23%',
    height: '0',
    overflow: 'hidden',
    maxWidth: '100%',
    background: '#000',
    margin: '5px'
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',
    background: 'transparent'
  },
  controlsBar: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    width: '100%',
    bottom: '0',
    color: 'white'
  },
  controlsBarButtons: {
    padding: '7px',
    cursor: 'pointer'
  },
  videoOverlay: {
    left: '50%',
    top: '50%',
    position: 'absolute',
    transition: 'visibility 1s ease-in-out'
  },
  hiddenObject: {
    display: 'none'
  }
};

var sliderStyles = {
  container: {
    position: 'relative',
    width: '100%'
  },
  slideBar: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgb(125, 122, 122)',
    boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.74)',
    position: 'absolute',
    cursor: 'pointer',
    transition: 'height 0.1s ease-in-out'
  },
  slideBarMouseEnter: {
    // height: '8px',
  },
  slideBarFill: {
    backgroundColor: '#F39C12',
    boxShadow: 'none',
    width: '60%'
  },
  labelContainer: {
    width: '100%'
  },
  maxLabel: {
    display: 'inline-block',
    float: 'right',
    userSelect: 'none'
  },
  valuePopUp: {
    position: 'absolute',
    top: 0,
    transition: 'opacity 0.15s ease-in-out',
    backgroundColor: 'rgb(24, 24, 24)',
    borderRadius: '4px',
    padding: '5px',
    border: '1px solid rgb(69, 68, 68)'
  },
  handleButton: {
    position: 'absolute',
    marginLeft: '-7px',
    marginTop: '-5px',
    width: '14px',
    height: '14px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'solid 3px #fff',
    backgroundColor: '#F39C12'
  }
};

exports.default = defaultStyles;
exports.sliderStyles = sliderStyles;