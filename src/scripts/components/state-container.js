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

    // Watch for back button
    window.addEventListener('popstate', this.historyUpdate);

    this.historyUpdate();
  }

  historyUpdate = () => {
    console.log('history update');

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

    const watchedVideos =
      localStorage.getItem('watchedVideos') === null
        ? {}
        : JSON.parse(localStorage.getItem('watchedVideos'));

    if (segments.length === 2) {
      if (!this.state.sortOptions.includes(sort)) {
        sort = 'hot';
        history.replaceState(null, null, `/r/${subreddit}`);
      } else if (['top', 'controversial'].includes(sort)) {
        // Don't rewrite URL since it is implicitly correct
      } else {
        history.replaceState(null, null, `/r/${subreddit}/${sort}`);
      }
    }

    if (timeRange === null) {
      timeRange = 'day';
    }

    this.setState({
      subreddit,
      sort,
      timeRange,
      watchedVideos,
    });

    const currentSession = {};
    this.lastSession = currentSession;

    fetch(`/api/videos/${subreddit}/${sort}/${timeRange}`)
      .then(res => res.json())
      .then(videos => {
        if (this.lastSession !== currentSession) return;
        this.setState({
          videos,
          currentVideo: videos[0],
        });
      });
  };

  changeVideo = index => {
    this.setState(
      prevState => ({
        currentVideoIndex: index,
        currentVideo: this.state.videos[index],
        watchedVideos: {
          ...prevState.watchedVideos,
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
  setSubreddit = async subreddit => {
    this.setState(
      {
        subreddit,
        sort: 'hot',
        videos: null,
        currentVideo: null,
        currentVideoIndex: 0,
      },
      () => {
        history.pushState(null, null, `/r/${this.state.subreddit}`);
      },
    );

    const currentSession = {};
    this.lastSession = currentSession;

    const res = await fetch(`/api/videos/${subreddit}/hot`);
    const videos = await res.json();
    if (this.lastSession !== currentSession) return;
    this.setState({
      videos,
      currentVideo: videos[0],
      // TODO Set currentVideo
    });
  };

  setSort = async sort => {
    this.setState(
      {
        sort,
        timeRange: 'day',
        videos: null,
        currentVideo: null,
        currentVideoIndex: 0,
      },
      () => {
        history.pushState(
          null,
          null,
          `/r/${this.state.subreddit}/${this.state.sort}`,
        );
      },
    );

    const currentSession = {};
    this.lastSession = currentSession;

    const res = await fetch(`/api/videos/${this.state.subreddit}/${sort}`);
    const videos = await res.json();
    if (this.lastSession !== currentSession) return;
    this.setState({
      videos,
      currentVideo: videos[0],
    });
  };

  setTimeRange = async timeRange => {
    this.setState(
      {
        timeRange,
        videos: null,
        currentVideo: null,
        currentVideoIndex: 0,
      },
      () => {
        history.pushState(
          null,
          null,
          `/r/${this.state.subreddit}/${this.state.sort}/?t=${timeRange}`,
        );
      },
    );

    const currentSession = {};
    this.lastSession = currentSession;

    const res = await fetch(
      `/api/videos/${this.state.subreddit}/${this.state.sort}/${timeRange}`,
    );
    const videos = await res.json();
    if (this.lastSession !== currentSession) return;
    this.setState({
      videos,
      currentVideo: videos[0],
    });
  };
}

export default StateContainer;
