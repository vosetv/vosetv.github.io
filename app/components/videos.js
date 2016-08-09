import React, { PropTypes, Component } from 'react';
import Video from './video';

// TODO: Change dumb way to select class
export default class Videos extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    watchedVideos: PropTypes.object.isRequired,
    handleKeyup: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    selectedVideo: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.keyUp = this.keyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUp);
  }

  keyUp(e) {
    const { handleKeyup, selectedVideo, videos } = this.props;

    if (e.keyCode === 39 && selectedVideo !== videos.length) {
      handleKeyup(selectedVideo + 1);
    } else if (e.keyCode === 37 && selectedVideo > 0) {
      handleKeyup(selectedVideo - 1);
    }
  }

  render() {
    // TODO: Just pass a watched flag and selected flag.
    /* eslint-disable no-unused-vars */
    const { videos, handleKeyup, ...other } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <ul className="video-list">
        {videos.map((video, i) => <Video {...other} video={video} key={i} index={i} />)}
      </ul>
    );
  }
}

