import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VideoItem from '../';

test.skip('should scroll into view when video changes', () => {
  const { queryByText } = render(<Sort />);
  expect(queryByText('sort')).toBe(null);
});
