import React, { useEffect, useRef, useState } from 'react';
import styles from '../../app.module.css';
import subreddits from '../../data/subreddits';
import {
  fetchSubreddit,
  type NormalizedVideoItem,
} from '../../services/fetch-subreddit';
import SortContext from '../sort-context';

const sortOptions = ['hot', 'new', 'controversial', 'top', 'rising'] as const;
const timeRangeOptions = ['hour', 'day', 'week', 'month', 'year', 'all'] as const;
type SortingOption = (typeof sortOptions)[number];
type TimeRangeOption = (typeof timeRangeOptions)[number];

type Filter = {
  id: string;
  items: string[];
  current: string;
};

function getTimeRange(search: string) {
  const raw = new URLSearchParams(search).get('t');
  return timeRangeOptions.includes(raw as TimeRangeOption)
    ? (raw as TimeRangeOption)
    : 'day';
}

function parseLocation(pathname: string, search: string) {
  const [subreddit = 'videos', rawSorting] = pathname
    .replace(/\/{2,}/g, '/')
    .replace(/^\/|\/$/g, '')
    .split('/')
    .slice(1);
  const sorting = sortOptions.includes(rawSorting as SortingOption)
    ? (rawSorting as SortingOption)
    : 'hot';
  const timeRange = ['top', 'controversial'].includes(sorting)
    ? getTimeRange(search)
    : 'day';

  return {
    subreddit,
    sorting,
    timeRange,
  };
}

export default function Vose({
  error,
  header,
  app,
}: {
  error: (props) => React.ReactNode;
  header: (props) => React.ReactNode;
  app: (props) => React.ReactNode;
}) {
  const initialState =
    typeof window === 'object'
      ? parseLocation(window.location.pathname, window.location.search)
      : { subreddit: 'videos', sorting: 'hot', timeRange: 'day' };
  const sessionRef = useRef<object | null>(null);
  const [current, setCurrent] = useState(0);
  const [videos, setVideos] = useState<NormalizedVideoItem[] | undefined>();
  // TODO Remove all the non changine state from here
  const [subreddit, setSubreddit] = useState<Filter>({
    id: 'subreddit',
    items: subreddits,
    current: initialState.subreddit,
  });
  const [sorting, setSorting] = useState<Filter>({
    id: 'sort',
    items: [...sortOptions],
    current: initialState.sorting,
  });
  // Conditionally add item to filter array
  const [timeRange, setTimeRange] = useState<Filter>({
    id: 'timeRange',
    items: [...timeRangeOptions],
    current: initialState.timeRange,
  });

  function setFilter({
    subreddit: nextSubreddit,
    sorting: nextSorting,
    timeRange: nextTimeRange,
  }: {
    subreddit?: string;
    sorting?: string;
    timeRange?: string;
  }) {
    if (nextSubreddit) {
      history.pushState({}, '', `/r/${nextSubreddit}`);
      setSorting((state) => ({ ...state, current: 'hot' }));
      setTimeRange((state) => ({ ...state, current: 'day' }));
      setSubreddit((state) => ({ ...state, current: nextSubreddit }));
      return;
    }

    if (nextSorting) {
      const safeSorting = sortOptions.includes(nextSorting as SortingOption)
        ? nextSorting
        : 'hot';
      history.pushState({}, '', `/r/${subreddit.current}/${safeSorting}`);
      setSorting((state) => ({ ...state, current: safeSorting }));
      if (!['top', 'controversial'].includes(safeSorting)) {
        setTimeRange((state) => ({ ...state, current: 'day' }));
      }
      return;
    }

    if (nextTimeRange) {
      const safeTimeRange = timeRangeOptions.includes(nextTimeRange as TimeRangeOption)
        ? nextTimeRange
        : 'day';
      history.pushState(
        {},
        '',
        `/r/${subreddit.current}/${sorting.current}/?t=${safeTimeRange}`,
      );
      setTimeRange((state) => ({ ...state, current: safeTimeRange }));
    }
  }

  const filters = [
    [
      subreddit,
      (subreddit) => {
        setFilter({ subreddit });
      },
    ],
    [
      sorting,
      (sorting) => {
        setFilter({ sorting });
      },
    ],
    ...(['top', 'controversial'].includes(sorting.current)
      ? [
          [
            timeRange,
            (timeRange) => {
              setFilter({ timeRange });
            },
          ],
        ]
      : []),
  ];

  const get = async () => {
    // Create session to avoid race condition, this object literal acts as an identifier
    const currentSession = {};
    sessionRef.current = currentSession;
    try {
      const videos = await fetchSubreddit({
        subreddit: subreddit.current,
        sorting: sorting.current,
        timeRange: timeRange.current,
      });
      console.log('videos fetch', videos);
      if (sessionRef.current !== currentSession) return;
      setVideos(videos);
    } catch (error) {
      console.error('error fetching subreddit', error);
      setVideos([]);
    }
  };

  useEffect(() => {
    console.log('fetching videos', subreddit, sorting, timeRange);
    setVideos(undefined);
    setCurrent(0);
    get();
  }, [subreddit.current, sorting.current, timeRange.current]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopState);
    // const timeRangeQuery =
    //   ['top', 'controversial'].includes(sorting.current!) &&
    //   timeRange.current !== 'day'
    //     ? `/?t=${timeRange.current}`
    //     : '';
    // const lastSegment =
    //   sorting.current === 'hot' ? '' : `/${sorting.current}${timeRangeQuery}`;

    // history.replaceState({}, '', `/r/${subreddit.current}${lastSegment}`);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // useEffect(() => {
  //   console.log('changing title');
  //   document.title = `r/${subreddit.current} - vose.tv`;
  // }, [subreddit.current]);

  function handlePopState() {
    const parsed = parseLocation(location.pathname, location.search);
    setCurrent(0);
    setSubreddit((state) => ({ ...state, current: parsed.subreddit }));
    setSorting((state) => ({ ...state, current: parsed.sorting }));
    setTimeRange((state) => ({ ...state, current: parsed.timeRange }));
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.repeat) return;
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey)
      return;
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      // Allow scroll into view to work with arrow keys
      event.preventDefault();
    }
    if (!videos || videos.length === 0) return;

    if (['ArrowLeft', 'j'].includes(event.key)) {
      setCurrent((index) => Math.max(index - 1, 0));
    }
    if (['ArrowRight', 'k'].includes(event.key)) {
      setCurrent((index) => Math.min(index + 1, videos.length - 1));
    }
  }

  function next() {
    setCurrent((index) =>
      videos?.length ? Math.min(index + 1, videos.length - 1) : index,
    );
  }

  return (
    <SortContext.Provider value={{ filters, setFilter }}>
      <div className={styles.app}>
        {header({ filters })}
        {videos === undefined || videos?.length > 0
          ? app({ videos, next, current, setCurrent })
          : error('no videos')}
      </div>
    </SortContext.Provider>
  );
}
