import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';
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
    const { handleKeyup, selectedVideo, videos } = this.props;

    if (e.keyCode === 39 && selectedVideo !== videos.length) {
      handleKeyup(selectedVideo + 1);
    } else if (e.keyCode === 37 && selectedVideo > 0) {
      handleKeyup(selectedVideo - 1);
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
}), dispatch => ({
  handleKeyup: (nextVideo) => {
    dispatch(selectVideo(nextVideo));
  },
  handleClick: (nextVideo) => {
    dispatch(selectVideo(nextVideo));
  },
}))(VideoList);
