import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import fetchBackend from '../../../utils/fetchBackend';
import AuthContext from '../../../AuthContext';
import AdminOrdersTable from './AdminOrdersTable';
import PaginationComponent from './PaginationComponent';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { dispatch } = useContext(AuthContext);

  async function fetchOrders(page) {
    dispatch({
      type: 'CLEAR_FEEDBACK',
    });
    fetchBackend(
      'GET',
      `api/orders?pageNumber=${page}`,
      undefined,
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      setOrders(data.orders);
      setNumberOfPages(data.numberOfPages);
    }).catch(() => dispatch({
      type: 'SET_FEEDBACK',
      payload: {
        variant: 'danger',
        message: 'Hoppá, valami elromlott. :( ',
      },
    }));
  }

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const [activePage, setActivePage] = useState(1);
  function loadPage(pageNum) {
    setActivePage(pageNum);
    fetchOrders(pageNum);
  }

  return (
    <Container>
      <h1 className="text-center my-5">Rendelések</h1>
      <AdminOrdersTable orders={orders} setOrders={setOrders} />
      <PaginationComponent active={activePage} numberOfPages={numberOfPages} className="mx-auto my-3" loadPage={loadPage} />
    </Container>
  );
}
