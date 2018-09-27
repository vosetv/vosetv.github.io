import { Component } from 'react';
import PropTypes from 'prop-types';
import subreddits from '../data/subreddits';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4004'
    : 'https://vose.tv';

export default class VideoProvider extends Component {
  static propTypes = {
    preloadedState: PropTypes.shape({
      videos: PropTypes.array,
      currentVideo: PropTypes.shape({
        title: PropTypes.string,
        flair: PropTypes.string,
        url: PropTypes.string,
        id: PropTypes.string,
        timestamp: PropTypes.number,
        score: PropTypes.number,
        comments: PropTypes.number,
      }),
      subreddit: PropTypes.string,
      sorting: PropTypes.string,
      timeRange: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      // App state
      currentVideoIndex: 0,
      currentVideo: null,

      // Fetched data
      videos: null,
      watchedVideos: null,

      // Sorting
      subreddit: 'videos',
      sorting: 'hot',
      timeRange: 'day',
      ...props.preloadedState,
    };
  }

  // Dropdown options
  subreddits = subreddits;
  sortOptions = ['hot', 'new', 'controversial', 'top', 'rising'];
  timeRangeOptions = ['hour', 'day', 'week', 'month', 'year', 'all'];

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('popstate', this.handlePopState);
    const { subreddit, sorting, timeRange } = this.state;
    const timeRangeQuery =
      ['top', 'controversial'].includes(sorting) && timeRange !== 'day'
        ? `/?t=${timeRange}`
        : '';
    const lastSegment = sorting === 'hot' ? '' : `/${sorting}${timeRangeQuery}`;

    history.replaceState({}, null, `/r/${subreddit}${lastSegment}`);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('popstate', this.handlePopState);
  }

  getSubAndSort = pathname => {
    const [subreddit = 'videos', sorting = 'hot'] = pathname
      // Remove multiple consecutive slashes from url
      .replace(/\/{2,}/g, '/')
      // Remove starting and trailing slashes
      .replace(/^\/|\/$/g, '')
      // get segemnts
      .split('/')
      // Remove "r" segment
      .slice(1);
    return [subreddit, sorting];
  };

  getTimeRange = query => {
    const searchParams = new URLSearchParams(query);
    const timeRange = searchParams.get('t') || 'day';
    return timeRange;
  };

  handlePopState = event => {
    const [subreddit, sorting] = this.getSubAndSort(location.pathname);
    const timeRange = this.getTimeRange(location.search);

    console.log('getsubandsort', subreddit, sorting, timeRange);

    this.setState(
      {
        // TODO isLoading
        currentVideoIndex: 0,
        currentVideo: null,
        videos: null,

        subreddit,
        sorting,
        timeRange,
      },
      this.fetchVideos,
    );
  };

  handleKeydown = event => {
    if (event.repeat) return;
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey)
      return;
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      // Allow scroll into view to work with arrow keys
      event.preventDefault();
    }

    if (['ArrowLeft', 'j'].includes(event.key)) {
      this.prev();
    }
    if (['ArrowRight', 'k'].includes(event.key)) {
      this.next();
    }
  };

  fetchVideos = async () => {
    // Create session to avoid race condition
    const currentSession = {};
    this.lastSession = currentSession;

    const { subreddit, sorting, timeRange } = this.state;

    const res = await fetch(
      `${baseUrl}/api/videos/${subreddit}/${sorting}/${timeRange}`,
    );

    const videos = await res.json();
    if (this.lastSession !== currentSession) return;
    this.setState({
      videos,
      currentVideo: videos[0],
    });
  };

  prev = () => {
    this.setVideo(Math.max(this.state.currentVideoIndex - 1, 0));
  };

  next = () => {
    this.setVideo(
      Math.min(this.state.currentVideoIndex + 1, this.state.videos.length - 1),
    );
  };

  setVideo = index => {
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

  sort = ({ subreddit, sorting, timeRange }) => {
    this.setState({ currentVideoIndex: 0, currentVideo: null, videos: null });
    if (subreddit) {
      this.setState({ subreddit, sorting: 'hot' }, this.fetchVideos);
      history.pushState({}, null, `/r/${subreddit}`);
    } else if (sorting) {
      this.setState({ sorting }, this.fetchVideos);
      history.pushState({}, null, `/r/${this.state.subreddit}/${sorting}`);
    } else {
      this.setState({ timeRange }, this.fetchVideos);
      history.pushState(
        {},
        null,
        `/r/${this.state.subreddit}/${this.state.sorting}/?t=${timeRange}`,
      );
    }
  };

  getSortProps = () => ({
    subreddits: this.subreddits,
    sortOptions: this.sortOptions,
    timeRangeOptions: this.timeRangeOptions,

    state: {
      subreddit: this.state.subreddit,
      sorting: this.state.sorting,
      timeRange: this.state.timeRange,
    },
  });

  getPlayerProps = () => ({
    currentVideo: this.state.currentVideo,
    next: this.next,
  });

  getVideoListProps = () => ({
    videos: this.state.videos,
    watchedVideos: this.state.watchedVideos,
    currentVideoIndex: this.state.currentVideoIndex,
    setVideo: this.setVideo,
  });

  render() {
    const { children } = this.props;

    return typeof children === 'function'
      ? children({
          isEmpty: this.state.videos && this.state.videos.length === 0,
          getVideoListProps: this.getVideoListProps,
          getPlayerProps: this.getPlayerProps,
          getSortProps: this.getSortProps,
          sort: this.sort,
        })
      : children || null;
  }
}
