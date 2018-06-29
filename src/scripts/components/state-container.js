import { Container } from 'unstated';
import subreddits from '../../subreddits';

class StateContainer extends Container {
  state = {
    // App state
    currentVideoIndex: 0,
    currentVideo: null,

    // Fetched data
    videos: null,
    watchedVideos: null,

    // Sorting
    subreddit: null,
    sort: null,
    timeRange: null,

    // Lists
    subreddits,
    sortOptions: ['hot', 'new', 'controversial', 'top', 'rising'],
    timeRangeOptions: ['hour', 'day', 'week', 'month', 'year', 'all'],
  };

  lastSession = 0;

  constructor() {
    super();
    window.addEventListener('popstate', this.historyUpdate);
    window.addEventListener('keydown', this.handleKeydown);

    const watchedVideos =
      localStorage.getItem('watchedVideos') === null
        ? {}
        : JSON.parse(localStorage.getItem('watchedVideos'));

    this.setState({
      watchedVideos,
    });

    this.historyUpdate();
  }

  historyUpdate = async () => {
    this.setState({
      videos: null,
      currentVideo: null,
      currentVideoIndex: 0,
    });

    const segments = location.pathname
      .replace(/\/{2,}/g, '/')
      .replace(/^\/|\/$/g, '')
      .split('/')
      .slice(1); // Remove "r"

    // Get time range for top and controversial sorting
    const searchParams = new URLSearchParams(location.search);
    let timeRange = searchParams.get('t');
    let [subreddit, sort = 'hot'] = segments;

    if (segments.length === 2) {
      if (!this.state.sortOptions.includes(sort)) {
        sort = 'hot';
        history.replaceState(null, null, `/r/${subreddit}`);
      } else if (!['top', 'controversial'].includes(sort)) {
        history.replaceState(null, null, `/r/${subreddit}/${sort}`);
      }
      // Don't rewrite URL for timeRange since it is implicitly correct
    }

    this.setState({
      subreddit,
      sort,
      timeRange: timeRange ? timeRange : 'day',
    });

    // Create session to avoid race condition
    const currentSession = {};
    this.lastSession = currentSession;

    const res = await fetch(`/api/videos/${subreddit}/${sort}/${timeRange}`);
    const videos = await res.json();
    if (this.lastSession !== currentSession) return;
    this.setState({
      videos,
      currentVideo: videos[0],
    });
  };

  handleKeydown = event => {
    if (event.keyCode === 37) {
      this.changeVideo(Math.max(this.state.currentVideoIndex - 1, 0));
    }
    if (event.keyCode === 39) {
      this.changeVideo(
        Math.min(this.state.currentVideoIndex + 1, this.state.videos.length - 1),
      );
    }
  };

  changeVideo = index => {
    this.setState(
      prevState => ({
        currentVideoIndex: index,
        currentVideo: this.state.videos[index],
        watchedVideos: {
          ...prevState.watchedVideos,
          // TODO Maybe put a expire date here instead of true
          ...{ [this.state.videos[index].id]: true },
        },
      }),
      () => {
        localStorage.setItem(
          'watchedVideos',
          JSON.stringify(this.state.watchedVideos),
        );
      },
    );
  };

  // TODO Tons of non dry boilerplate, maybe we can clean this up
  sort = async ({
    subreddit,
    sort,
    timeRange,
  }) => {
    if (subreddit) {
      history.pushState({}, '', `/r/${subreddit}`);
    } else if (sort) {
      history.pushState({}, '', `/r/${this.state.subreddit}/${sort}`);
    } else {
      history.pushState({}, '', `/r/${this.state.subreddit}/${this.state.sort}/?t=${timeRange}`);
    }
    this.historyUpdate();
  };
}

export default StateContainer;
