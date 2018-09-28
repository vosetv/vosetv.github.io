import React, { PureComponent } from 'react';
import Observer from 'react-intersection-observer';
import PropTypes from 'prop-types';

// Image name conflicts with browser Image constructor
export default class ImageComponent extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  };
  state = {
    loaded: false,
  };
  loadImage = inView => {
    if (!inView || this.state.loaded) return;
    // console.log('load image');
    // TODO Handle 404s
    const image = new Image();
    image.onload = () => this.setState({ loaded: true });
    image.src = this.props.src;
  };
  render() {
    return (
      <Observer onChange={this.loadImage} rootMargin="0px 0px 500px">
        {({ ref }) =>
          this.state.loaded ? (
            <img ref={ref} {...this.props} />
          ) : (
            <div
              ref={ref}
              className="video-item__thumb video-item__thumb--preview"
            />
          )
        }
      </Observer>
    );
  }
}
