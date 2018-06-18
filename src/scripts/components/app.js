import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectVideo,
  videoWatch,
  selectSubreddit,
  fetchVideosIfNeeded,
  invalidateSubreddit,
} from '../actions';
import Header from './header';
import Videos from './videos';
import Player from './player';
import subreddits from '../../subreddits';

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    selectedVideo: PropTypes.number.isRequired,
    videos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    watchedVideos: PropTypes.object.isRequired,
  };

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

  handleNavigation() {
    this.props.dispatch(
      selectSubreddit(location.pathname.replace(/\/{2,}/, '/').split('/')[2]),
    );
  }

  onVideoWatch = videoId => {
    this.props.dispatch(videoWatch(videoId));
  };

  handleKeyup = nextVideo => {
    this.props.dispatch(selectVideo(nextVideo));
  };

  handleEnd = nextVideo => {
    this.props.dispatch(selectVideo(nextVideo));
  };

  handleClick = nextVideo => {
    this.props.dispatch(selectVideo(nextVideo));
  };

  handleChange = nextSubreddit => {
    this.props.dispatch(selectVideo(0));
    this.props.dispatch(selectSubreddit(nextSubreddit, true));
  };

  render() {
    const {
      selectedVideo,
      selectedSubreddit,
      videos,
      isFetching,
      watchedVideos,
    } = this.props;
    return (
      <>
        <Header
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={subreddits}
        />
        {videos.length > 0 && (
          <>
            <Player
              video={videos[selectedVideo]}
              selectedVideo={selectedVideo}
              onEnd={this.handleEnd}
              onVideoWatch={this.onVideoWatch}
            />
            <Videos
              handleClick={this.handleClick}
              videos={videos}
              selectedVideo={selectedVideo}
              handleKeyup={this.handleKeyup}
              watchedVideos={watchedVideos}
            />
          </>
        )}
        {/*
          TODO: Error screen, suggest new subreddits.
          We couldn't find any videos for you...
          Try some of our favourites:
            - /r/artisanvideos
            - /r/shittyrobots
            - ...
        */}
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    selectedVideo,
    selectedSubreddit,
    videosBySubreddit,
    watchedVideos,
  } = state;
  const { isFetching, items: videos } = videosBySubreddit[
    selectedSubreddit
  ] || {
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
