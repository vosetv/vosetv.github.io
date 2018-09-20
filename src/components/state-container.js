import { Container } from '@simonlc/unstated';
import subreddits from '../data/subreddits';

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

    if (subreddit === undefined) {
      subreddit = 'videos';
      this.replaceState(`/r/${subreddit}`);
    }

    if (segments.length === 2) {
      if (!this.state.sortOptions.includes(sort)) {
        sort = 'hot';
        this.replaceState(`/r/${subreddit}`);
      } else if (!['top', 'controversial'].includes(sort)) {
        this.replaceState(`/r/${subreddit}/${sort}`);
      }
      // Don't rewrite URL for timeRange since it is implicitly correct
    }

    this.setState({
      subreddit,
      sort,
      timeRange: timeRange ? timeRange : 'day',
    });

    document && (document.title = `/r/${subreddit} - vose.tv`);

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
    if ([37, 39].includes(event.keyCode)) {
      // Allow scroll into view to work with arrow keys
      // TODO only prevent default if no modifier key is held
      event.preventDefault();
    }

    if ([37, 75].includes(event.keyCode)) {
      this.changeVideo(Math.max(this.state.currentVideoIndex - 1, 0));
    }
    if ([39, 74].includes(event.keyCode)) {
      this.changeVideo(
        Math.min(
          this.state.currentVideoIndex + 1,
          this.state.videos.length - 1,
        ),
      );
    }
  };

  changeVideo = index => {
    this.setState(
      state => ({
        currentVideoIndex: index,
        currentVideo: state.videos[index],
        watchedVideos: {
          ...state.watchedVideos,
          ...{ [state.videos[index].id]: true },
        },
      }),
      () =>
        localStorage.setItem(
          'watchedVideos',
          JSON.stringify(this.state.watchedVideos),
        ),
    );
  };

  sort = ({ subreddit, sort, timeRange }) => {
    if (subreddit) {
      this.pushState(`/r/${subreddit}`);
    } else if (sort) {
      this.pushState(`/r/${this.state.subreddit}/${sort}`);
    } else {
      this.pushState(
        `/r/${this.state.subreddit}/${this.state.sort}/?t=${timeRange}`,
      );
    }
    this.historyUpdate();
  };

  replaceState(url) {
    history.replaceState({}, '', url);
    console.log(url);
  }

  pushState(url) {
    history.pushState({}, '', url);
  }
}

export default StateContainer;
