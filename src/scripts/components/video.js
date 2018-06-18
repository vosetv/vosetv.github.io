import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import ensureVisibleHOC from './ensure-visible-mixin';

// TODO Clean up props, lots aren't necessary
const Video = ({
  handleClick,
  video,
  index,
  selectedVideo,
  watchedVideos,
  getNode,
}) => {
  const classes = objstr({
    'video-item': true,
    'video-item--selected': selectedVideo === index,
    'video-item--watched': watchedVideos && watchedVideos[video.id] === true,
  });
  return (
    <li
      className={classes}
      ref={node => getNode(node)}
      onClick={() => handleClick(index)}
    >
      <img className="video-item__thumb" src={video.thumbnail} alt="" />
      <div className="video-item__title">{video.title}</div>
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

export default ensureVisibleHOC(Video);
