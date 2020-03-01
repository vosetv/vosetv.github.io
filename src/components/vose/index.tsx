import React from 'react';
import SortContext from '../sort-context';
import subreddits from '../../data/subreddits';

type Filter = {
  title: string;
  items: string[];
  currentItem: string;
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
  function setFilter() {}
  const filters: Filter[] = [
    {
      title: 'subreddit',
      items: subreddits,
      currentItem: subreddits[0],
    },
  ];
  return (
    <SortContext.Provider value={{ setFilter, filters }}>
      {header({ setFilter, filters })}
    </SortContext.Provider>
  );
}
