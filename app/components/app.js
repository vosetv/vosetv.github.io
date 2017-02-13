import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import {
  selectVideo,
  videoWatch,
  selectFilter,
  fetchVideosIfNeeded,
} from '../actions';
import Header from '../components/header';
import Videos from '../components/videos';
import Player from '../components/player';
import Overlay from '../components/overlay';
import subreddits from '../subreddits';

class App extends Component {
  static propTypes = {
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit, selectedFilter } = this.props;
    dispatch(fetchVideosIfNeeded(selectedSubreddit, selectedFilter));
    window.addEventListener('popstate', this.handleNavigation);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit
    || nextProps.selectedFilter !== this.props.selectedFilter) {
      const { dispatch, selectedSubreddit, selectedFilter } = nextProps;
      dispatch(fetchVideosIfNeeded(selectedSubreddit, selectedFilter));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleNavigation);
  }

  onVideoWatch = (videoId) => {
    this.props.dispatch(videoWatch(videoId));
  }

  handleKeyup = (nextVideo) => {
    this.props.dispatch(selectVideo(nextVideo));
  }

  handleEnd = (nextVideo) => {
    this.props.dispatch(selectVideo(nextVideo));
  }

  handleClick = (nextVideo) => {
    this.props.dispatch(selectVideo(nextVideo));
  }

  handleChange = (nextSubreddit) => {
    const { dispatch, selectedFilter } = this.props;
    dispatch(selectVideo(0));
    dispatch(selectFilter(nextSubreddit, selectedFilter, true));
  }

  handleFilterChange = nextFilter => {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(selectVideo(0));
    dispatch(selectFilter(selectedSubreddit, nextFilter, true));
  }

  handleNavigation = () => {
    // TODO Handle filter
    const path = location.pathname.replace(/\/{2,}/, '/').split('/');
    this.props.dispatch(selectFilter(path[2], path[3]));
  }

  render() {
    const { selectedVideo, selectedSubreddit, selectedFilter, videos, isFetching, watchedVideos } = this.props;
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
          <Videos
            handleClick={this.handleClick}
            videos={videos}
            selectedVideo={selectedVideo}
            handleKeyup={this.handleKeyup}
            watchedVideos={watchedVideos}
          />
        }
        {isFetching && videos.length === 0 &&
          <Overlay />
        }
        {!isFetching && videos.length === 0 &&
          <div className="overlay">
            <h2>Empty.</h2>
          </div>
        }
        {/* XXX: Put this guy after the player to fix some shitty z-index crap (we're an app who cares about order) */}
        <Header
          value={selectedSubreddit}
          filter={selectedFilter}
          onChange={this.handleChange}
          onFilterChange={this.handleFilterChange}
          options={subreddits}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    selectedVideo,
    selectedSubreddit,
    selectedFilter,
    videosBySubreddit,
    watchedVideos
  } = state;

  // If destructuring is confusing, this assings two new variables,
  // isFetching, and videos.
  const {
    isFetching,
    items: videos,
  } = get(videosBySubreddit, [selectedFilter, selectedSubreddit]) || {
    isFetching: true,
    items: [],
  };

  return {
    watchedVideos,
    selectedVideo,
    selectedSubreddit,
    selectedFilter,
    videos,
    isFetching,
  };
}

export default connect(mapStateToProps)(App);
