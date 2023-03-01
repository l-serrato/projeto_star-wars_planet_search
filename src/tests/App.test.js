import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(testData) },
  );
});

describe('App testes', () => {
  const NUMERO = '200000';
  const MAIORQUE = 'maior que';
  const MENORQUE = 'menor que';
  const IGUALA = 'igual a';
  const NAME = 'tatooine'

  test('Verifica se a API é chamada', () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('Verifica se tem 1 botão na tela', () => {
    render(<App />);

    const buttonElement = screen.queryAllByRole('button');
    expect(buttonElement.length).toBe(1);
  });  

  test('Verifica se os dados são renderizados na tabela com filtro menor que', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('cell', {name: /Hoth/i})).toBeInTheDocument();    
    })
    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();
    userEvent.clear(screen.getByTestId('value-filter'))
    userEvent.type(value, NUMERO);

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), [MENORQUE])
    expect(screen.getByRole('option', {name: MENORQUE}).selected).toBe(true)

    const button = screen.getByRole('button');
    userEvent.click(button)
    expect(screen.getByText('Yavin IV')).toBeInTheDocument();
  });

  test('Verifica se os dados são renderizados na tabela com filtro maior que', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('cell', {name: /Hoth/i})).toBeInTheDocument();    
    })
    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();
    userEvent.clear(screen.getByTestId('value-filter'))
    userEvent.type(value, NUMERO);

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), [MAIORQUE])
    expect(screen.getByRole('option', {name: MAIORQUE}).selected).toBe(true)

    const button = screen.getByRole('button');
    userEvent.click(button)
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });

  test('Verifica se os dados são renderizados na tabela com filtro igual a', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('cell', {name: /Hoth/i})).toBeInTheDocument();    
    })
    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();
    userEvent.clear(screen.getByTestId('value-filter'))
    userEvent.type(value, NUMERO);

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), [IGUALA])
    expect(screen.getByRole('option', {name: IGUALA}).selected).toBe(true)

    const button = screen.getByRole('button');
    userEvent.click(button)
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  test('Verifica se os dados são renderizados na tabela com filtro name', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('cell', {name: /Hoth/i})).toBeInTheDocument();    
    })
    const value = screen.getByTestId('name-filter');
    expect(value).toBeInTheDocument();
    userEvent.clear(screen.getByTestId('name-filter'))
    userEvent.type(value, NAME);

    const button = screen.getByRole('button');
    userEvent.click(button)
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});
