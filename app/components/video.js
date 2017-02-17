import React, { PropTypes } from 'react';
import classnames from 'classnames';
import EnsureVisibleMixin from './ensure-visible-mixin';

const Video = ({ handleClick, video, index, currentVideo, watchedVideos, getNode }) => {
  const classes = classnames(
    'video-item',
    {
      'video-item--selected': (currentVideo === index),
      'video-item--watched': (watchedVideos.includes(video.id)),
    },
  );
  return (
    <li className={classes} ref={node => getNode(node)} onClick={() => handleClick(index)}>
      <img className="video-item__thumb" src={video.thumbnail} role="presentation" />
      <div className="video-item__title">
        {video.title}
      </div>
    </li>
  );
};

Video.propTypes = {
  video: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  watchedVideos: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  getNode: PropTypes.func.isRequired,
  currentVideo: PropTypes.number.isRequired,
};

export default EnsureVisibleMixin(Video);
