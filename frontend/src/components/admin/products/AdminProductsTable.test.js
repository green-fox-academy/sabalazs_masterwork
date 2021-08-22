import React from 'react';
import { render } from '@testing-library/react';
import AdminProductsTable from './AdminProductsTable';
import ContextWrapper from '../../../testUtil';

describe('Admin products table', () => {
  it('renders correctly', () => {
    const { queryByText, queryByTestId } = render(
      <ContextWrapper>
        <AdminProductsTable products={[{
          isAvailable: true,
          labels: ['új termék'],
          _id: '6118c257d371de51c8bc7c41',
          name: 'Vajas croissant',
          price: 1000,
        }]}
        />
      </ContextWrapper>,
    );
    expect(queryByText('Vajas croissant')).toBeTruthy();
    expect(queryByText('1000')).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeTruthy();
    expect(queryByTestId('delete-button')).toBeTruthy();
  });
});
