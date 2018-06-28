import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';

class Video extends React.Component {
  myRef = React.createRef();

  componentDidMount() {
    this.scrollIntoViewIfNeeded();
  }

  componentDidUpdate() {
    this.scrollIntoViewIfNeeded();
  }

  // TODO Put this in prop
  scrollIntoViewIfNeeded() {
    if (this.props.isSelected) {
      this.myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  render() {
    const { thumbnail, title, isSelected, isWatched, onClick } = this.props;
    const classes = objstr({
      'video-item': true,
      'video-item--selected': isSelected,
      'video-item--watched': isWatched,
    });
    return (
      <li ref={this.myRef} className={classes} onClick={onClick}>
        <img className="video-item__thumb" src={thumbnail} alt="" />
        <div className="video-item__title">{title}</div>
      </li>
    );
  }
}

Video.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isWatched: PropTypes.bool.isRequired,
};

export default Video;
