import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { changeVideo } from '../actions';
import Video from './video';


export class VideoList extends Component {
  static propTypes = {
  };

  componentDidMount() {
    window.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUp);
  }

  keyUp = (e) => {
    const { handleKeyup, currentVideo, videos } = this.props;

    if (e.keyCode === 39 && currentVideo !== videos.length) {
      handleKeyup(currentVideo + 1);
    } else if (e.keyCode === 37 && currentVideo > 0) {
      handleKeyup(currentVideo - 1);
    }
  }

  render() {
    // TODO: Just pass a watched flag and selected flag.
    const { videos, handleKeyup, ...other } = this.props;

    return (
      <ul className="video-list">
        {videos.map((video, i) => <Video {...other} video={video} key={video.id} index={i} />)}
      </ul>
    );
  }
}

export default connect(state => ({
  watchedVideos: state.watchedVideos,
}), dispatch => ({
  handleKeyup: (nextVideo) => {
    dispatch(changeVideo(nextVideo));
  },
  handleClick: (nextVideo) => {
    dispatch(changeVideo(nextVideo));
  },
}))(VideoList);
