import React from 'react';
import SortContext from '../sort-context';
import subreddits from '../../data/subreddits';

type Filter = {
  title: string;
  items: string[];
  currentItem: string;
};

export default function Vose({
  initialState,
  error,
  header,
  app,
}: {
  initialState: any;
  error: (props) => React.ReactNode;
  header: (props) => React.ReactNode;
  app: (props) => React.ReactNode;
}) {
  // TODO
  function setFilter() {}

  const filters: Filter[] = [
    {
      title: 'subreddit',
      items: subreddits,
      currentItem: initialState.subreddit,
    },
    {
      title: 'sort',
      items: ['hot', 'new', 'controversial', 'top', 'rising'],
      currentItem: initialState.sorting,
    },
    {
      title: 'timeRange',
      items: ['hour', 'day', 'week', 'month', 'year', 'all'],
      currentItem: initialState.timeRange,
    },
  ];
  let videos = initialState.videos;
  const currentVideo = 0;

  return (
    <SortContext.Provider value={{ setFilter, filters }}>
      {header({ setFilter, filters })}
      {videos === undefined || videos?.length > 0
        ? app({ videos, currentVideo })
        : error('no videos')}
    </SortContext.Provider>
  );
}
