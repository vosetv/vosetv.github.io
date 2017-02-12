import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import {
  selectVideo,
  videoWatch,
  selectFilter,
  fetchVideosIfNeeded,
  invalidateSubreddit,
} from '../actions';
import Header from '../components/header';
import Videos from '../components/videos';
import Player from '../components/player';
import subreddits from '../subreddits';

const Overlay = () =>
  <div className="overlay">
    <div className="overlay__content">
      <svg viewBox="0 0 40 40">
        <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
        <path id="overlay__loader" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z" />
      </svg>
      <h2>Loading</h2>
    </div>
  </div>

class App extends Component {
  static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    selectedVideo: PropTypes.number.isRequired,
    videos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    watchedVideos: PropTypes.object.isRequired,
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
    window.addEventListener('popstate', this.handleNavigation);
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
