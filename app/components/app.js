import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  selectFilter,
  fetchVideosIfNeeded,
} from '../actions';
import Header from '../components/header';
import VideoList from '../components/video-list';
import Player from '../components/player';

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

  handleNavigation = () => {
    // TODO Handle filter
    const path = location.pathname.replace(/\/{2,}/, '/').split('/');
    this.props.dispatch(selectFilter(path[2], path[3]));
  }

  render() {
    const { selectedVideo, selectedSubreddit, selectedFilter, videos, isFetching, watchedVideos } = this.props;
    return (
      <div>
        <Header
          value={selectedSubreddit}
          filter={selectedFilter}
        />
        {videos.length > 0 &&
          <Player
            video={videos[selectedVideo]}
            selectedVideo={selectedVideo}
          />
        }
        {videos.length > 0 &&
          <VideoList
            videos={videos}
            selectedVideo={selectedVideo}
            watchedVideos={watchedVideos}
          />
        }
      </div>
    );
  }
}
