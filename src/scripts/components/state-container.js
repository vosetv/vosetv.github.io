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

  constructor() {
    super();

    // Watch for back button
    window.addEventListener('popstate', this.historyUpdate);

    // Get URL Segments
    const segments = location.pathname
      .replace(/\/{2,}/g, '/')
      .replace(/^\/|\/$/g, '')
      .split('/')
      .slice(1); // Remove "r"

    // Get time range for top and controversial sorting
    const searchParams = new URLSearchParams(location.search);
    let timeRange = searchParams.get('t');
    console.log(segments, timeRange, location.search.slice(1), searchParams);
    let [subreddit, sort = 'hot'] = segments;

    const watchedVideos =
      localStorage.getItem('watchedVideos') === null
        ? {}
        : JSON.parse(localStorage.getItem('watchedVideos'));

    if (segments.length === 2) {
      if (!this.state.sortOptions.includes(sort)) {
        sort = 'hot';
        history.replaceState(null, null, `/r/${subreddit}`)
      } else if (['top', 'controversial'].includes(sort)) {
        // Don't rewrite URL since it is implicitly correct
      } else {
        history.replaceState(null, null, `/r/${subreddit}/${sort}`)
      }
    }

    if (timeRange === null) {
      timeRange = 'day';
    }

    console.log(timeRange);
    this.setState({
      subreddit,
      sort,
      timeRange,
      watchedVideos,
    });

    fetch(`/api/videos/${subreddit}/${sort}/${timeRange}`)
      .then(res => res.json())
      .then(videos => {
        this.setState({
          videos,
          currentVideo: videos[0],
        });
      });
  }

  // historyUpdate() {
  //   const [, subreddit, sort] = location.pathname
  //     .replace(/\/{2,}/, '/')
  //     .split('/');

  //   if (subreddit !== this.state.subreddit) {
  //     if (this.state.sort) {
  //       history.pushState(`/r/${this.state.subreddit}/${this.state.sort}`);
  //     } else {
  //       history.pushState(`/r/${this.state.subreddit}`);
  //     }
  //   } else if (sort !== this.state.sort) {
  //     history.pushState(`/r/${this.state.subreddit}/${this.state.sort}`);
  //   }
  // }

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

  setSubreddit = async subreddit => {
    this.setState({
      subreddit,
      sort: 'hot',
      videos: null,
      currentVideo: null,
      currentVideoIndex: 0,
    }, () => {
      history.pushState(null, null, `/r/${this.state.subreddit}`);
    });
    const res = await fetch(`/api/videos/${subreddit}/hot`);
    const videos = await res.json();
    this.setState({
      videos,
      currentVideo: videos[0],
      // TODO Set currentVideo
    });
  };

  setSort = async sort => {
    this.setState({
      sort,
      videos: null,
      currentVideo: null,
      currentVideoIndex: 0,
    }, () => {
      history.pushState(null, null, `/r/${this.state.subreddit}/${this.state.sort}`);
    });
    const res = await fetch(`/api/videos/${this.state.subreddit}/${sort}`);
    const videos = await res.json();
    this.setState({
      videos,
      currentVideo: videos[0],
    });
  };

  setTimeRange = async timeRange => {
    this.setState({
      timeRange,
      videos: null,
      currentVideo: null,
      currentVideoIndex: 0,
    }, () => {
      history.pushState(null, null, `/r/${this.state.subreddit}/${this.state.sort}/?t=${timeRange}`);
    });
    const res = await fetch(`/api/videos/${this.state.subreddit}/${this.state.sort}/${timeRange}`);
    const videos = await res.json();
    this.setState({
      videos,
      currentVideo: videos[0],
    });
  };
}

export default StateContainer;
