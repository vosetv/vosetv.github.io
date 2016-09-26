import React, { PropTypes } from 'react';
import classnames from 'classnames';
import EnsureVisibleMixin from './ensure-visible-mixin';

const Video = props => {
  const { handleClick, video, index, selectedVideo, watchedVideos, getNode } = props;
  const classes = classnames(
    'video-item',
    {
      'video-item--selected': (selectedVideo === index),
      'video-item--watched': (watchedVideos && watchedVideos[video.id] === true),
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
  watchedVideos: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  getNode: PropTypes.func.isRequired,
  selectedVideo: PropTypes.number.isRequired,
};

export default EnsureVisibleMixin(Video);
