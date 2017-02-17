import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  changeFilter,
  requestVideos,
} from '../actions';
import Header from '../components/header';
import VideoList from '../components/video-list';
import Player from '../components/player';

class App extends Component {
  static propTypes = {
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { subreddit, sort } = this.props.filter;
    dispatch(requestVideos({ subreddit, sort }));

    window.addEventListener('popstate', this.handleNavigation);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit
    || nextProps.selectedFilter !== this.props.selectedFilter) {
      const { dispatch, selectedSubreddit, selectedFilter } = nextProps;
      dispatch(requestVideos({ subreddit: selectedSubreddit, sort: selectedFilter }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleNavigation);
  }

  handleNavigation = () => {
    // TODO Handle filter
    const [,,subreddit, sort] = location.pathname.replace(/\/{2,}/, '/').split('/');
    this.props.dispatch(changeFilter({ subreddit, sort }));
  }

  render() {
    const { currentVideo, videos, watchedVideos } = this.props;
    return (
      <div>
        <Header />
        {videos.length > 0 &&
          <Player
            video={videos[currentVideo]}
            currentVideo={currentVideo}
          />
        }
        {videos.length > 0 &&
          <VideoList
            videos={videos}
            currentVideo={currentVideo}
            watchedVideos={watchedVideos}
          />
        }
      </div>
    );
  }
}

export default connect(state => ({
  videos: state.videos,
  filter: state.filter,
  currentVideo: state.currentVideo,
}))(App);
