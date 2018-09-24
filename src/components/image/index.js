import React, { Component } from 'react';
import Observer from 'react-intersection-observer';
import PropTypes from 'prop-types';

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  };
  // state = {
  //   src: null,
  // };
  // loadImage = () => {
  //   this.setState({ src: this.props.src });
  // };
  render() {
    const { src, ...props } = this.props;
    return (
      <Observer>
        {({ inView, ref }) => <img ref={ref} src={inView ? src : undefined} {...props} />}
      </Observer>
    );
  }
}
