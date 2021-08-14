import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Col, Row } from "react-bootstrap";
import fetchBackend from '../../utils/fetchBackend';
import { AuthContext } from '../../App';
import AdminProductsTable from './AdminProductsTable';
import { useHistory } from 'react-router-dom';

export default function AdminProducts() {
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const { dispatch } = useContext(AuthContext);
    useEffect(() => {
        dispatch({
            type: 'CLEAR_FEEDBACK'
        });
        fetchBackend(
            'GET',
            `api/products`,
            undefined
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            setProducts(data.products);
        }).catch(error => {
            return dispatch({
                type: 'SET_FEEDBACK',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        });
    }, []);

    return (
        <Container>
            <h1 className='text-center my-5'>Termékek</h1>
            <Col xs={12} sm={12} md={10} xl={8} className="m-auto">
                <AdminProductsTable products={products} setProducts={setProducts}/>
                <Row className='mt-5'>
                    <Col></Col>
                    <Col xs={5} md={4} xl={2} className='text-center' >
                        <Button onClick={() => history.push('/admin/new-product')}>
                            Új termék
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Container>
    );
};