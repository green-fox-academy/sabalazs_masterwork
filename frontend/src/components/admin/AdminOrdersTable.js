import React, { useState, useContext } from 'react';
import { Table, Container, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../App';
import fetchBackend from '../../utils/fetchBackend';
import { v4 as uuidv4 } from 'uuid';
import { Trash } from 'react-bootstrap-icons';
import ConfirmDeleteModal from './ConfirmDeleteModal';


export default function AdminOrdersTable({ orders, setOrders }) {

    const { dispatch } = useContext(AuthContext);

    function getBgColor(status) {
        switch (status) {
            case 'pending': return 'bg-warning text-white';
            case 'accepted': return 'bg-success text-white';
            case 'fulfilled': return 'bg-light text-dark';
            case 'refused': return 'bg-danger text-white';
            default: return '';
        }
    }

    function handleChange(e, orderId, index) {
        const newStatus = e.currentTarget.value;
        fetchBackend(
            'PUT',
            `api/orders/${orderId}`,
            {
                status: newStatus
            }
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            console.log(data);
            let ordersCopy = [...orders];
            let itemCopy = { ...orders[index] };
            itemCopy.status = newStatus;
            ordersCopy[index] = itemCopy;
            setOrders([...ordersCopy]);
        }).catch(error => {
            return dispatch({
                type: 'SET_FEEDBACK',
                payload: {
                    variant: 'danger',
                    message: 'Hoppá, valami elromlott. :( '
                }
            });
        });
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
            <Table bordered hover responsive='xs'>
                <thead>
                    <tr className='text-center'>
                        <th>Vásárló</th>
                        <th>Rendelés</th>
                        <th>Dátum</th>
                        <th>Összeg</th>
                        <th>Státusz</th>
                        <th>Törlés</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => (
                            <tr key={order._id} className={getBgColor(order.status)}>
                                <th>{order.customer.email}</th>
                                <td>
                                    <ul>
                                        {
                                            order.items.map((item) => {
                                                return <li key={uuidv4()}>{item.quantity} db {item.name}</li>
                                            })
                                        }
                                    </ul>
                                </td>
                                <td>{new Date(order.datePosted).toLocaleDateString()}</td>
                                <td>{order.sum},- Ft</td>
                                <td className={`p-0`}>
                                    <select
                                        className={`p-2 text-center w-100 border-0 text-center ${getBgColor(order.status)}`}
                                        value={order.status}
                                        onChange={(e) => handleChange(e, order._id, index)}>
                                        <option value='pending' className="bg-light text-dark">Feldolgozás alatt</option>
                                        <option value='accepted' className="bg-light text-dark">Átvehető</option>
                                        <option value='fulfilled' className="bg-light text-dark">Átvéve</option>
                                        <option value='refused' className="bg-white text-dark">Visszautasítva</option>
                                    </select>
                                </td>
                                <td className="bg-light text-center">
                                    <Button
                                        variant='danger'
                                        onClick={handleShow}
                                        data-id={order._id}
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
                collection='orders'
                itemId={id}
                index={index}
                items={orders}
                setItems={setOrders}
                setShow={setShow}
                show={show}
            />
        </Container>

    )
}
