import React, { PropTypes, Component } from 'react';
import YouTube from 'react-youtube';

export default class Player extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    selectedVideo: PropTypes.number.isRequired,
    onEnd: PropTypes.func.isRequired,
    onVideoTime: PropTypes.func.isRequired,
    onVideoWatch: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    // Check that we are changing video to update the percentage.
    if (nextProps.selectedVideo === this.props.selectedVideo) {
      return;
    }

    const videoId = this.props.video.id;
    const duration = this.refs.player.internalPlayer.getDuration();
    const time = this.refs.player.internalPlayer.getCurrentTime();

    Promise.all([duration, time]).then(values => {
      return this.props.onVideoTime(videoId, Math.floor(values[1] / values[0] * 100));
    })
    .catch(err => {
      console.error('Player Error:', err);
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.video.id !== this.props.video.id;
  }

  render() {
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
            ref="player"
            videoId={video.id}
            opts={opts}
            onEnd={() => onEnd(selectedVideo + 1)}
            onReady={() => onVideoWatch(video.id)}
          />
        </div>
        <h1 className="player-title"><a href={`https://reddit.com${video.url}`} target="_blank">{video.title}</a></h1>
        {video.flair &&
          <div className="player-flair">{video.flair}</div>
        }
        <footer className="player-footer">
          <a className="player-comments" href={`https://reddit.com${video.url}`} target="_blank">{video.comments} comments</a>
          <div className="player-score">Score: {video.score}</div>
        </footer>
      </div>
    );
  }
}
