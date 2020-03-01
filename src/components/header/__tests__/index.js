import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '../';

test('should render with no props and show logo', () => {
  const { container, getByLabel } = render(
    <Header />
  );
});
