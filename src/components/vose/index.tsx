import React, { useEffect, useRef, useState } from 'react';
import styles from '../../app.module.css';
import subreddits from '../../data/subreddits';
import { normalizeVideos } from '../../normalizeVideos';
import { fetchSubreddit } from '../../services/fetch-subreddit';
import SortContext from '../sort-context';

type Filter = {
  id: string;
  items: string[];
  current: string;
};

export default function Vose({
  error,
  header,
  app,
}: {
  error: (props) => React.ReactNode;
  header: (props) => React.ReactNode;
  app: (props) => React.ReactNode;
}) {
  const sessionRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [videos, setVideos] = useState();
  // TODO Remove all the non changine state from here
  const [subreddit, setSubreddit] = useState<Filter>({
    id: 'subreddit',
    items: subreddits,
    current: subreddits[1],
  });
  const [sorting, setSorting] = useState<Filter>({
    id: 'sort',
    items: ['hot', 'new', 'controversial', 'top', 'rising'],
    current: 'hot',
  });
  // Conditionally add item to filter array
  const [timeRange, setTimeRange] = useState<Filter>({
    id: 'timeRange',
    items: ['hour', 'day', 'week', 'month', 'year', 'all'],
    current: 'day',
  });

  const filters = [
    [
      subreddit,
      (subreddit) => {
        history.pushState({}, '', `/r/${subreddit}`);
        setSorting((state) => ({ ...state, current: 'hot' }));
        setTimeRange((state) => ({ ...state, current: 'day' }));
        setSubreddit((state) => ({ ...state, current: subreddit }));
      },
    ],
    [
      sorting,
      (sorting) => {
        history.pushState({}, '', `/r/${subreddit.current}/${sorting}`);
        setSorting((state) => ({ ...state, current: sorting }));
      },
    ],
    ...(['top', 'controversial'].includes(sorting.current)
      ? [
          [
            timeRange,
            (timeRange) => {
              history.pushState(
                {},
                '',
                `/r/${subreddit.current}/${sorting.current}/?t=${timeRange}`,
              );
              setTimeRange((state) => ({ ...state, current: timeRange }));
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
  }, [subreddit, sorting, timeRange]);

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

  function handlePopState(event: PopStateEvent) {
    let [subreddit = 'videos', sorting] = location.pathname
      // Remove multiple consecutive slashes from url
      .replace(/\/{2,}/g, '/')
      // Remove starting and trailing slashes
      .replace(/^\/|\/$/g, '')
      // get segemnts
      .split('/')
      // Remove "r" segment
      .slice(1);
    sorting = sortOptions.includes(sorting) ? sorting : 'hot';
    // const timeRange = getTimeRange(location.search);

    //     dispatch({
    //       type: 'loading',
    //       payload: {
    //         subreddit,
    //         timeRange,
    //         sorting: sorting as SortingOption,
    //       },
    //     });
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

  function next() {
    setCurrent((current) => current + 1);
  }

  return (
    <SortContext.Provider value={{ filters }}>
      <div className={styles.app}>
        {header({ filters })}
        {videos === undefined || videos?.length > 0
          ? app({ videos, next, current, setCurrent })
          : error('no videos')}
      </div>
    </SortContext.Provider>
  );
}
