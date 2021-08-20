import React from 'react';
import { render } from '@testing-library/react';
import ProductCard from './ProductCard';
import ContextWrapper from '../../testUtil';

describe('Product Card', () => {
  it('renders correctly', () => {
    const { queryByText } = render(
      <ContextWrapper>
        <ProductCard product={{
          isAvailable: true,
          labels: ['új termék'],
          _id: '6118c257d371de51c8bc7c41',
          name: 'Vajas croissant',
          price: 1000,
        }}
        />
      </ContextWrapper>,
    );
    expect(queryByText('Vajas croissant')).toBeTruthy();
    expect(queryByText('új termék')).toBeTruthy();
    expect(queryByText('1000,- Ft')).toBeTruthy();
  });
});
