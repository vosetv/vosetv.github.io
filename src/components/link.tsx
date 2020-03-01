import React, { useContext } from 'react';
import SortContext from './sort-context';

export default function Link({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const { filters, setFilter } = useContext(SortContext);
  return (
    <a
      onClick={event => {
        event.preventDefault();
        setFilter({ subreddit: to });
      }}
      href={`/r/${to}`}
    >
      {children}
    </a>
  );
}
