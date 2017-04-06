import React, { Component } from 'react';
import { sliderStyles as styles } from './defaultStyles';

class RangeSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fillWidth: ((this.props.value - this.props.min) /
        (this.props.max - this.props.min) * 100),
      value: this.props.value,
      mouseX: 0,
      mouseDown: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.mouseDown)
      return;
    this.setState({
      fillWidth: ((nextProps.value - nextProps.min) /
        (nextProps.max - nextProps.min) * 100),
      value: nextProps.value,
    });
  }

  handleClick(e) {
    const rect = this.refs.container.getBoundingClientRect();
    const percentage = (e.pageX - rect.left) / rect.width;

    if (this.props.type === 'float') {
      const value = this.props.min + percentage * this.props.max;
      this.setState({
        fillWidth: percentage * 100,
        value,
        mouseX: rect.left + (e.pageX - rect.left),
      });
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    } else {
      const value = Math.round(this.props.min + percentage * this.props.max);
      const intPercentage = (value / (this.props.max - this.props.min)) * 100;

      this.setState({
        fillWidth: intPercentage,
        value,
        mouseX: rect.left + (e.pageX - rect.left),
      });
    }
  }

  handleMouseDown() {
    this.setState({ mouseDown: true });
  }

  handleMouseUp() {
    this.setState({ mouseDown: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  handleMouseMove(e) {
    if (this.state.mouseDown) {
      this.handleClick(e);
    }
  }
  handleMouseEnter() {
    this.setState({ mouseEnter: true });
  }
  handleMouseLeave(e) {
    if (this.state.mouseDown) {
      this.handleClick(e);
      this.setState({ mouseDown: false, mouseEnter: false });
    } else {
      this.setState({ mouseEnter: false });
    }
  }

  render() {
    const { barStyle, barFillStyle, barHandlerStyle } = this.props;
    return (
      <div>
        <div
          style={styles.container}
          ref="container"
          onClick={this.handleClick}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
        >
          <div
            style={Object.assign({}, styles.slideBar, barStyle,
              this.state.mouseEnter ? styles.slideBarMouseEnter : {})}
          />
          <div
            style={Object.assign({}, styles.slideBar,
              styles.slideBarFill,
              barFillStyle,
              this.state.mouseEnter ? styles.slideBarMouseEnter : {},
              { width: `${this.state.fillWidth}%` })}
          />
          <div
            style={Object.assign({}, styles.handleButton, barHandlerStyle,
              { left: `${this.state.fillWidth}%` })}
          />
        </div>
      </div>
    );
  }
}
RangeSlider.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
  type: React.PropTypes.string,
  barStyle: React.PropTypes.object,
  barFillStyle: React.PropTypes.object,
  barHandlerStyle: React.PropTypes.object,
};
RangeSlider.defaultProps = {
  min: 0,
  type: 'float',
};
export default RangeSlider;
