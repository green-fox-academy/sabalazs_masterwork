import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import fetchBackend from '../../utils/fetchBackend';
import AuthContext from '../../AuthContext';

export default function ConfirmDeleteModal({
  collection, itemId, index, items, setItems, setShow, show,
}) {
  const { dispatch } = useContext(AuthContext);

  function handleDelete(id, itemIndex, showModal) {
    showModal(false);
    fetchBackend(
      'DELETE',
      `api/${collection}/${id}`,
      undefined,
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      const itemsCopy = [...items];
      itemsCopy.splice(itemIndex, 1);
      setItems(itemsCopy);
    }).catch(() => {
      dispatch({
        type: 'SET_FEEDBACK',
        payload: {
          variant: 'danger',
          message: 'Hoppá, valami elromlott. :( ',
        },
      });
    });
  }

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rendelés törlése</Modal.Title>
      </Modal.Header>
      <Modal.Body>Biztosan törölni szeretnéd?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Mégse
        </Button>
        <Button variant="danger" onClick={() => handleDelete(itemId, index, setShow)}>
          Törlés
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
