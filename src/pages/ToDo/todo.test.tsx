import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ToDo from '.';

describe('Main screen', () => {
  it('should match snapshot', () => {
    const { container } = render(<ToDo />);

    expect(container).toMatchSnapshot();
  });
});
