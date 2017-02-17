import React, { PropTypes, Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';
import { watchVideo, changeVideo } from '../actions';

class Player extends Component {
  static propTypes = {
  };

  componentDidMount() {
    window.addEventListener('keyup', this.keyUp);
  }

  componentWillReceiveProps(nextProps) {
    const { onVideoWatch, video, currentVideo } = this.props;
    if (nextProps.currentVideo === currentVideo) {
      return;
    }
    onVideoWatch(video.id);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.video.id !== this.props.video.id;
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.keyUp);
  }

  keyUp = (e) => {
    // press letter O
    if (e.keyCode === 79) {
      window.open(`https://reddit.com${this.props.video.url}`, '_blank');
    }
  }

  render() {
    // TODO: videos watched first gets updated here once we get video on ready, but we should try to get it before.
    const { video, onEnd, currentVideo, onVideoWatch } = this.props;
    const opts = {
      playerVars: {
        autoplay: 1,
        start: video.timestamp,
      },
    };

    return (
      <div className="player">
        <div className="player-embed" id="player-embed">
          <YouTube
            videoId={video.id}
            opts={opts}
            onEnd={() => onEnd(currentVideo + 1)}
            onReady={() => onVideoWatch(video.id)}
          />
        </div>
        <header className="player-header">
          <h1 className="player-title"><a href={`https://reddit.com${video.url}`} target="_blank" rel="noopener noreferrer">{video.title}</a></h1>
          {video.flair &&
            <div className="player-flair">{video.flair}</div>
          }
        </header>
        <footer className="player-footer">
          <a className="player-comments" href={`https://reddit.com${video.url}`} target="_blank" rel="noopener noreferrer">{video.comments} comments</a>
          <div className="player-score">Score: {video.score}</div>
        </footer>
      </div>
    );
  }
}

export default connect(state => ({
}), dispatch => ({
  onVideoWatch: (videoId) => {
    dispatch(watchVideo(videoId));
  },
  onEnd: (nextVideo) => {
    dispatch(changeVideo(nextVideo));
  },
}))(Player);
