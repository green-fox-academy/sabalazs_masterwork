import React, { useState, useContext } from 'react';
import { Table, Container, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../App';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import fetchBackend from '../../utils/fetchBackend';

export default function AdminProductsTable({ products, setProducts }) {

    const { dispatch, state } = useContext(AuthContext);
    const history = useHistory();

    function handleDelete(productId, index, setShow) {
        setShow(false);
        fetchBackend(
            'DELETE',
            `api/products/${productId}`,
            undefined
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            const productsCopy = [...products];
            productsCopy.splice(index, 1);
            setProducts(productsCopy);
        }).catch(error => {
            dispatch({
                type: 'SET_FEEDBACK',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        });
    }
    function handleEdit(productId) {
        history.push(`/admin/edit-product/${productId}`);
    }


    const [show, setShow] = useState(false);
    const [index, setIndex] = useState('');
    const [id, setId] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setIndex(e.currentTarget.dataset.index);
        setId(e.currentTarget.dataset.id);
        setShow(true)
    };


    return (
        <Container>
            <Table striped bordered hover responsive='xs'>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Ár</th>
                        <th>Lehetőségek</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td className='d-flex justify-content-around'>
                                    <Button
                                        variant='primary'
                                        onClick={() => handleEdit(product._id)}
                                    ><Pencil />
                                    </Button>
                                    <Button
                                        variant='danger'
                                        onClick={handleShow}
                                        data-id={product._id}
                                        data-index={index}
                                    >
                                        <Trash />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Termék törlése</Modal.Title>
                </Modal.Header>
                <Modal.Body>Biztosan törölni szeretnéd?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Mégse
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(id, index, setShow)}>
                        Törlés
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}