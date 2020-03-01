import React from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { render, fireEvent } from '@testing-library/react';
import VideoList from '../';

test('should render preview if no videos are ready', () => {
  const { container, rerender } = render(<VideoList />);
  expect(container.querySelectorAll('.placeholder').length).toBe(32);
});
