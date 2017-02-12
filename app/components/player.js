import React, { PropTypes, Component } from 'react';
import YouTube from 'react-youtube';

export default class Player extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    selectedVideo: PropTypes.number.isRequired,
    onEnd: PropTypes.func.isRequired,
    onVideoWatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keyup', this.keyUp);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedVideo === this.props.selectedVideo) {
      return;
    }
    this.props.onVideoWatch(this.props.video.id);
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
    const { video, onEnd, selectedVideo, onVideoWatch } = this.props;
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
            onEnd={() => onEnd(selectedVideo + 1)}
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
