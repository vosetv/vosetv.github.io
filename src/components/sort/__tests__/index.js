import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sort from '../';

test('should only render with children', () => {
  const { container, queryByText } = render(
    <Sort />
  );
  expect(queryByText('sort')).toBe(null);
});

test('should render label "sort" when children available', () => {
  const { container, getAllByText } = render(
    <Sort>
      {['child']}
    </Sort>
  );
  expect(getAllByText('Sort').length).toBe(1);
});
