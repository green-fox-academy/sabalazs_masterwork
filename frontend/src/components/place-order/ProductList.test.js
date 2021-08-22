import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProductList from './ProductList';
import ContextWrapper from '../../testUtil';

describe('Search box', () => {
  it('renders correctly', () => {
    const { queryByPlaceholderText } = render(
      <ContextWrapper>
        <ProductList products={[]} />
      </ContextWrapper>,
    );
    expect(queryByPlaceholderText('Keresés...')).toBeTruthy();
  });

  describe('input value', () => {
    it('updates on change', () => {
      const { queryByPlaceholderText } = render(
        <ContextWrapper>
          <ProductList products={[]} />
        </ContextWrapper>,
      );
      const searchInput = queryByPlaceholderText('Keresés...');
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(searchInput.value).toBe('test');
    });
  });
});
describe('Card group', () => {
  it('renders correctly', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <ProductList products={[]} />
      </ContextWrapper>,
    );
    expect(queryByTestId('card-group')).toBeTruthy();
  });
});
describe('Products', () => {
  it('are filtered correctly without search', () => {
    const { getAllByTestId } = render(
      <ContextWrapper>
        <ProductList products={[
          {
            isAvailable: true,
            labels: ['új termék'],
            _id: '6118c257d371de51c8bc7c41',
            name: 'Vajas croissant',
            price: 1000,
          },
        ]}
        />
      </ContextWrapper>,
    );
    expect(getAllByTestId('product-card')).toBeTruthy();
  });
  it('are filtered correctly with matching search', () => {
    const { queryAllByTestId, queryByPlaceholderText } = render(
      <ContextWrapper>
        <ProductList products={[
          {
            isAvailable: true,
            labels: ['új termék'],
            _id: '6118c257d371de51c8bc7c41',
            name: 'Vajas croissant',
            price: 1000,
          },
        ]}
        />
      </ContextWrapper>,
    );
    const searchInput = queryByPlaceholderText('Keresés...');
    fireEvent.change(searchInput, { target: { value: 'Vajas' } });
    expect(queryAllByTestId('product-card')).toBeTruthy();
  });
  it('are filtered correctly with unmatching search', () => {
    const { queryAllByTestId, queryByPlaceholderText } = render(
      <ContextWrapper>
        <ProductList products={[
          {
            isAvailable: true,
            labels: ['új termék'],
            _id: '6118c257d371de51c8bc7c41',
            name: 'Vajas croissant',
            price: 1000,
          },
        ]}
        />
      </ContextWrapper>,
    );
    const searchInput = queryByPlaceholderText('Keresés...');
    fireEvent.change(searchInput, { target: { value: 'Keksz' } });
    expect(queryAllByTestId('product-card')).toHaveLength(0);
  });
});
