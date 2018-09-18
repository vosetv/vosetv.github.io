import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import './styles.css';

class VideoItem extends React.Component {
  ref = React.createRef();

  componentDidUpdate(prevProps) {
    if (
      this.props.isSelected &&
      prevProps.isSelected !== this.props.isSelected
    ) {
      this.scrollIntoView();
    }
  }

  scrollIntoView() {
    this.ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  render() {
    const { thumbnail, title, isSelected, isWatched, onClick } = this.props;
    const classes = objstr({
      'video-item': true,
      'video-item--selected': isSelected,
      'video-item--watched': isWatched,
    });
    return (
      <li ref={this.ref} className={classes} onClick={onClick}>
        <img className="video-item__thumb" src={thumbnail} alt="" />
        <div className="video-item__title">{title}</div>
      </li>
    );
  }
}

VideoItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isWatched: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VideoItem;
