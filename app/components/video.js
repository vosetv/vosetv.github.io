import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default class Video extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    watchedVideos: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    selectedVideo: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.ensureVisible = this.ensureVisible.bind(this);
  }

  componentDidMount() {
    this.ensureVisible();
  }

  componentDidUpdate() {
    this.ensureVisible();
  }

  ensureVisible() {
    const { index, selectedVideo } = this.props;
    if (selectedVideo === index) {
      ReactDOM.findDOMNode(this).scrollIntoViewIfNeeded(false);
    }
  }

  render() {
    const { handleClick, video, index, selectedVideo, watchedVideos } = this.props;
    const classes = classnames(
      'video-item',
      {
        'video-item--selected': (selectedVideo === index),
        'video-item--watched': (watchedVideos && watchedVideos[video.id] === true),
      });
    return (
      <li className={classes} onClick={() => handleClick(index)}>
        <img className="video-item__thumb" src={video.thumbnail} role="presentation" />
        <div className="video-item__title">
          {video.title}
        </div>
      </li>
    );
  }
}
