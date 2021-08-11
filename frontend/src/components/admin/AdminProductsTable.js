import React, { useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { Trash, Pencil, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function AdminProductsTable({ products, setProducts }) {

    const history = useHistory();

    function handleEdit(productId) {
        history.push(`/admin/edit-product/${productId}`);
    }

    const [show, setShow] = useState(false);
    const [index, setIndex] = useState('');
    const [id, setId] = useState('');
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
                        <th className="w-50">Név</th>
                        <th className="w-25">Ár</th>
                        <th>Rendelhető</th>
                        <th>Lehetőségek</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td className="text-center">{product.isAvailable ? <CheckCircleFill color={'green'} size={25} /> : <XCircleFill color={'red'} size={25} />}</td>
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
            <ConfirmDeleteModal
                collection='products'
                itemId={id}
                index={index}
                items={products}
                setItems={setProducts}
                setShow={setShow}
                show={show}
            />
        </Container>
    )
}