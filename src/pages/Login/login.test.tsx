import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from './index';
import '@testing-library/jest-dom';

describe('Componente de Login', () => {
  it('Chama a função de realizar o login quando é clicado submit', () => {
    const funcao = jest.fn((e) => e.preventDefault());

    render(<Login loginUser={funcao} />);

    fireEvent.click(screen.getByTestId('logar'));

    expect(funcao).toHaveBeenCalledTimes(1);
  });
});
