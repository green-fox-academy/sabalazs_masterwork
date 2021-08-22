import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import ContextWrapper from '../../../testUtil';

describe('Admin new product form', () => {
  it('renders correctly', () => {
    const { queryByText, queryByPlaceholderText } = render(
      <ContextWrapper>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </ContextWrapper>,
    );
    expect(queryByText('Név:')).toBeTruthy();
    expect(queryByPlaceholderText('Termék neve')).toBeTruthy();
    expect(queryByText('Ár:')).toBeTruthy();
    expect(queryByPlaceholderText('Termék ára')).toBeTruthy();
    expect(queryByText('Kép:')).toBeTruthy();
    expect(queryByText('Rendelhető')).toBeTruthy();
    expect(queryByText('Címkék:')).toBeTruthy();
    expect(queryByText('Mentés')).toBeTruthy();
    expect(queryByText('Vissza')).toBeTruthy();
  });
});
