import { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import subreddits from '../data/subreddits';

import { NormalizedVideoItem, Dictionary } from '../services/fetch-subreddit';

export interface SortProps {
  subreddits: string[];
  sortOptions: SortTuple;
  timeRangeOptions: TimeRangeTuple;
  state: SortOptions;
}
export interface Sort {
  sort: (options: State) => void;
}
type Videos = NormalizedVideoItem[] | null;
interface SortOptions {
  subreddit?: string;
  sorting?: SortingOption;
  timeRange?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
}
export interface State extends SortOptions {
  currentVideo?: NormalizedVideoItem | null;
  currentVideoIndex?: number;
  videos?: Videos;
  watchedVideos?: Dictionary<boolean>;
}
export interface StateType {
  subreddit: string;
  sorting: SortingOption;
  timeRange: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  currentVideo: NormalizedVideoItem | null;
  currentVideoIndex: number;
  videos: Videos;
  watchedVideos: Dictionary<boolean>;
}
interface Action {
  type: 'video change' | 'next' | 'prev' | 'videos loaded' | 'loading';
  payload?: State;
}
export interface VideoListProps extends State {
  setVideo: (index: number) => void;
}
interface PlayerProps {
  currentVideo: NormalizedVideoItem | null;
  next: () => void;
}
interface PropGetters {
  isEmpty: boolean;
  getVideoListProps: () => VideoListProps;
  getPlayerProps: () => PlayerProps;
  getSortProps: () => SortProps;
  sort: (options: State) => void;
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}`
    : 'https://vose.tv';

// Dropdown options
const sortOptions = ['hot', 'new', 'controversial', 'top', 'rising'] as const;
export type SortTuple = typeof sortOptions;
export type SortingOption = SortTuple[number];
const timeRangeOptions = [
  'hour',
  'day',
  'week',
  'month',
  'year',
  'all',
] as const;
export type TimeRangeTuple = typeof timeRangeOptions;
type TimeRange = TimeRangeTuple[number];

function getWatchedVideos() {
  let watchedVideos;
  try {
    watchedVideos = JSON.parse(localStorage.getItem('watchedVideos') || '{}');
  } catch {
    watchedVideos = {};
  }
  return watchedVideos;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loading':
      // TODO fetchVideos useEffect when videos is null
      const {
        subreddit = state.subreddit,
        sorting = state.sorting,
        timeRange = state.timeRange,
      } = action.payload as State;
      return {
        ...state,
        // TODO isLoading
        currentVideoIndex: 0,
        currentVideo: null,
        videos: null,

        subreddit,
        sorting,
        timeRange,
        // TODO merge old state in here
      };
    case 'videos loaded':
      let { videos } = action.payload as State;
      let currentVideo;
      if (videos) {
        currentVideo = videos[0];
      } else {
        currentVideo = null;
        videos = [];
      }
      return {
        ...state,
        videos,
        currentVideo,
        watchedVideos: {
          ...state.watchedVideos,
          ...(videos.length && { [videos[0].id]: true }),
        },
      };
    case 'next':
    // Fallthrough
    case 'prev':
    // Fallthrough
    case 'video change':
      let currentVideoIndex: number;
      if (state.videos === null) {
        return state;
      } else if (state.videos!.length === 0) {
        return state;
      }
      if (action.type === 'next') {
        currentVideoIndex = Math.min(
          state.currentVideoIndex! + 1,
          state.videos!.length - 1,
        );
      } else if (action.type === 'prev') {
        currentVideoIndex = Math.max(state.currentVideoIndex! - 1, 0);
      } else {
        currentVideoIndex = action.payload!.currentVideoIndex!;
      }
      return {
        ...state,
        currentVideoIndex,
        currentVideo: state.videos![currentVideoIndex],
        watchedVideos: {
          ...state.watchedVideos,
          ...{ [state.videos![currentVideoIndex].id]: true },
        },
      };
    default:
      throw new Error();
  }
}

export default function VideoProvider({
  preloadedState,
  children,
}: {
  preloadedState: State;
  children: (props: PropGetters) => JSX.Element;
}) {
  const lastSessionRef = useRef({});

  const [state, dispatch] = useReducer(reducer, {
    // App state
    currentVideoIndex: 0,
    currentVideo: null,

    watchedVideos: {
      ...getWatchedVideos(),
      ...(preloadedState.videos!.length && {
        [preloadedState.videos![0].id]: true,
      }),
    },

    // Sorting
    subreddit: 'videos',
    sorting: 'hot',
    timeRange: 'day',
    ...preloadedState,
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopState);
    const { subreddit, sorting, timeRange } = state;
    const timeRangeQuery =
      ['top', 'controversial'].includes(sorting!) && timeRange !== 'day'
        ? `/?t=${timeRange}`
        : '';
    const lastSegment = sorting === 'hot' ? '' : `/${sorting}${timeRangeQuery}`;

    history.replaceState({}, '', `/r/${subreddit}${lastSegment}`);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [state.subreddit, state.sorting, state.timeRange]);

  useEffect(() => {
    localStorage.setItem('watchedVideos', JSON.stringify(state.watchedVideos));
  }, [state.watchedVideos]);

  async function fetchVideos() {
    // Create session to avoid race condition, this object literal acts as an identifier
    const currentSession = {};
    lastSessionRef.current = currentSession;

    const { subreddit, sorting, timeRange } = state;

    const res = await fetch(
      `${baseUrl}/api/videos/${subreddit}/${sorting}/${timeRange}`,
    );

    const videos = (await res.json()) as Videos;
    if (lastSessionRef.current !== currentSession) return;
    dispatch({
      type: 'videos loaded',
      payload: {
        videos,
      },
    });
  }

  function getSubAndSort(pathname: string) {
    let [subreddit = 'videos', sorting] = pathname
      // Remove multiple consecutive slashes from url
      .replace(/\/{2,}/g, '/')
      // Remove starting and trailing slashes
      .replace(/^\/|\/$/g, '')
      // get segemnts
      .split('/')
      // Remove "r" segment
      .slice(1);
    sorting = sortOptions.includes(sorting as SortingOption) ? sorting : 'hot';
    // if (sortOptions.includes(sorting) === false) {
    //   sorting = 'hot';
    // }
    return [subreddit, sorting];
  }

  function getTimeRange(query: string) {
    const searchParams = new URLSearchParams(query);
    const timeRange = searchParams.get('t') ?? 'day';
    return timeRange;
  }

  function handlePopState(event: PopStateEvent) {
    const [subreddit, sorting] = getSubAndSort(location.pathname);
    const timeRange = getTimeRange(location.search) as TimeRange;

    dispatch({
      type: 'loading',
      payload: {
        subreddit,
        timeRange,
        sorting: sorting as SortingOption,
      },
    });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.repeat) return;
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey)
      return;
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      // Allow scroll into view to work with arrow keys
      event.preventDefault();
    }

    if (['ArrowLeft', 'j'].includes(event.key)) {
      dispatch({ type: 'prev' });
    }
    if (['ArrowRight', 'k'].includes(event.key)) {
      dispatch({ type: 'next' });
    }
  }

  // NOTE Used to change video on VideoItem click
  function setVideo(currentVideoIndex: number) {
    dispatch({
      type: 'video change',
      payload: {
        currentVideoIndex,
      },
    });
  }

  function sort({ subreddit, sorting, timeRange }: SortOptions) {
    if (subreddit) {
      dispatch({ type: 'loading', payload: { subreddit, sorting: 'hot' } });
      history.pushState({}, '', `/r/${subreddit}`);
    } else if (sorting) {
      dispatch({ type: 'loading', payload: { sorting } });
      history.pushState({}, '', `/r/${state.subreddit}/${sorting}`);
    } else {
      dispatch({ type: 'loading', payload: { timeRange } });
      history.pushState(
        {},
        '',
        `/r/${state.subreddit}/${state.sorting}/?t=${timeRange}`,
      );
    }
  }

  const getSortProps = () => ({
    subreddits,
    sortOptions,
    timeRangeOptions,

    state: {
      subreddit: state.subreddit,
      sorting: state.sorting,
      timeRange: state.timeRange,
    },
  });

  const getPlayerProps = () => ({
    currentVideo: state.currentVideo!,
    next: () => dispatch({ type: 'next' }),
  });

  const getVideoListProps = () => ({
    videos: state.videos,
    watchedVideos: state.watchedVideos,
    currentVideoIndex: state.currentVideoIndex,
    setVideo,
  });

  // Prop getters: https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters
  return typeof children === 'function'
    ? children({
        isEmpty: (state.videos && state.videos.length) === 0, // Is not null, and is not > 0
        getVideoListProps,
        getPlayerProps,
        getSortProps,
        sort,
      })
    : children ?? null;
}

VideoProvider.propTypes = {
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
