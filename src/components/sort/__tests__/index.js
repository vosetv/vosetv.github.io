import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sort from '../';

test('should only render with children', () => {
  const { queryByText } = render(<Sort />);
  expect(queryByText('sort')).toBe(null);
});

test('should render label "sort" when children available', () => {
  const filters = [
    {
      title: 'subreddit',
      items: ['test', 'wow', 'cool'],
      currentItem: 'wow',
    },
  ];
  const { getAllByText } = render(<Sort filters={filters} />);
  expect(getAllByText('Sort').length).toBe(1);
});

test('should render any number of filters', () => {
  const filters = [
    {
      title: 'subreddit-1',
      items: ['test', 'wow', 'cool'],
      currentItem: 'wow',
    },
    {
      title: 'subreddit-2',
      items: ['test', 'wow', 'cool'],
      currentItem: 'wow',
    },
    {
      title: 'subreddit-3',
      items: ['test', 'wow', 'cool'],
      currentItem: 'wow',
    },
    {
      title: 'subreddit-4',
      items: ['test', 'wow', 'cool'],
      currentItem: 'wow',
    },
    {
      title: 'subreddit-5',
      items: ['test', 'wow', 'cool'],
      currentItem: 'wow',
    },
  ];
  const { getAllByText } = render(<Sort filters={filters} />);
  expect(getAllByText('wow').length).toBe(filters.length);
});
