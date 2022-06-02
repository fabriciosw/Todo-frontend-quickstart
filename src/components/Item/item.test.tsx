import React from 'react';
import { render } from '@testing-library/react';
import Item from './index';
import '@testing-library/jest-dom';
import { ITarefa } from '../../interfaces/tarefa';

describe('Item component', () => {
  it('must match snapshot', () => {
    const task: ITarefa = {
      id: 1,
      title: 'testing task',
      description: 'testing description',
      complete: false,
    };
    const { container } = render(<Item tarefa={task} />);

    expect(container).toMatchSnapshot();
  });
});
