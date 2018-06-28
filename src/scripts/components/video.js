import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import ensureVisible from './ensure-visible';

class Video extends React.Component {
  componentDidMount() {
    this.scrollIntoViewIfNeeded();
  }

  componentDidUpdate() {
    this.scrollIntoViewIfNeeded();
  }

  // TODO Put this in prop
  scrollIntoViewIfNeeded() {
    if (this.props.scrollIntoView) {
      this.myRef.current.scrollIntoViewIfNeeded(false);
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
      <li className={classes} onClick={onClick}>
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
  ensureVisible: PropTypes.bool.isRequired,
};

export default ensureVisible(Video);
