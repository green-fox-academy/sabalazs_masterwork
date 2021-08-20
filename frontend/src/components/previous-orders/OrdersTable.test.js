import React from 'react';
import { render } from '@testing-library/react';
import OrdersTable from './OrdersTable';
import ContextWrapper from '../../testUtil';

describe('Order Card', () => {
  it('renders correctly', () => {
    const { queryByText } = render(
      <ContextWrapper>
        <OrdersTable orders={[{
          _id: '611f74dcd8f29b56fca12c48',
          status: 'pending',
          items: [{
            _id: '611f74dcd8f29b56fca12c49',
            product: '611e30d1c6d63a59e85bd6d7',
            quantity: 1,
            name: 'Vajas croissant',
            price: 900,
          }],
          sum: 900,
          customer: {
            _id: '6118c257d371de51c8bc7c39',
            role: 'customer',
            email: 'customer@customer.customer',
            __v: 0,
          },
          datePosted: '2021-08-20T09:24:44.493Z',
          __v: 0,
        },
        {
          _id: '611f74dcd8f29b56fca12c48',
          status: 'fulfilled',
          items: [{
            _id: '611f74dcd8f29b56fca12c49',
            product: '611e30d1c6d63a59e85bd6d7',
            quantity: 1,
            name: 'Sós perec',
            price: 1100,
          }],
          sum: 1100,
          customer: {
            _id: '6118c257d371de51c8bc7c39',
            role: 'customer',
            email: 'customer@customer.customer',
            __v: 0,
          },
          datePosted: '2021-08-20T09:24:44.493Z',
          __v: 0,
        }]}
        />
      </ContextWrapper>
    );
    expect(queryByText('1 db Vajas croissant')).toBeTruthy();
    expect(queryByText('900,- Ft')).toBeTruthy();
    expect(queryByText('Feldolgozás alatt')).toBeTruthy();
    expect(queryByText('Lezárt rendelések')).toBeTruthy();
    expect(queryByText('Átvéve')).toBeTruthy();
  });
});
