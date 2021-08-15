import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationComponent({ active, numberOfPages, loadPage }) {
  const items = [];
  for (let i = 1; i <= numberOfPages; i += 1) {
    items.push(
      <Pagination.Item key={i} active={i === active} onClick={() => loadPage(i)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination className="justify-content-center">{items}</Pagination>
  );
}
