import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  selectVideo,
  videoWatch,
  selectSubreddit,
  fetchVideosIfNeeded,
  invalidateSubreddit,
} from '../actions';
import Header from '../components/header';
import Videos from '../components/videos';
import Player from '../components/player';
import subreddits from '../subreddits';

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    selectedVideo: PropTypes.number.isRequired,
    videos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    watchedVideos: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.onVideoWatch = this.onVideoWatch.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchVideosIfNeeded(selectedSubreddit));
    window.addEventListener('popstate', this.handleNavigation);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchVideosIfNeeded(selectedSubreddit));
    }
  }

  componentWillUnmount() {
    window.addEventListener('popstate', this.handleNavigation);
  }

  onVideoWatch(videoId) {
    console.log('handler', videoId);
    this.props.dispatch(videoWatch(videoId));
  }

  handleKeyup(nextVideo) {
    this.props.dispatch(selectVideo(nextVideo));
  }

  handleEnd(nextVideo) {
    this.props.dispatch(selectVideo(nextVideo));
  }

  handleClick(nextVideo) {
    this.props.dispatch(selectVideo(nextVideo));
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectVideo(0));
    this.props.dispatch(selectSubreddit(nextSubreddit, true));
  }

  handleNavigation() {
    this.props.dispatch(selectSubreddit(location.pathname.split('/')[2]));
  }

  handleRefreshClick(e) {
    const { dispatch, selectedSubreddit } = this.props;
    e.preventDefault();
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchVideosIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedVideo, selectedSubreddit, videos, isFetching, watchedVideos } = this.props;
    return (
      <div>
        {videos.length > 0 &&
          <Player
            video={videos[selectedVideo]}
            selectedVideo={selectedVideo}
            onEnd={this.handleEnd}
            onVideoWatch={this.onVideoWatch}
          />
        }
        {videos.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Videos
              handleClick={this.handleClick}
              videos={videos}
              selectedVideo={selectedVideo}
              handleKeyup={this.handleKeyup}
              watchedVideos={watchedVideos}
            />
          </div>
        }
        {/* TODO: Only fade out once video is ready */}
        {/* TODO: Simplify svg and remove SMIL */}
        {isFetching && videos.length === 0 &&
          <div className="overlay">
            <div className="overlay__content">
              <svg viewBox="0 0 40 40">
                <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                <path id="overlay__loader" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z" />
              </svg>
              <h2>Loading</h2>
            </div>
          </div>
        }
        {/*
          TODO: Error screen, suggest new subreddits.
          We couldn't find any videos for you...
          Try some of our favourites:
            - /r/artisanvideos
            - /r/shittyrobots
            - ...
        */}
        {!isFetching && videos.length === 0 &&
          <div className="overlay">
            <h2>Empty.</h2>
          </div>
        }
        {/* XXX: Put this guy after the player to fix some shitty z-index crap (we're an app who cares about order) */}
        <Header
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={subreddits}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedVideo, selectedSubreddit, videosBySubreddit, watchedVideos } = state;
  const {
    isFetching,
    items: videos,
  } = videosBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    watchedVideos,
    selectedVideo,
    selectedSubreddit,
    videos,
    isFetching,
  };
}

export default connect(mapStateToProps)(App);
