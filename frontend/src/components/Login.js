import React, { useState, useContext } from "react";
import logo from "../logo.svg";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "../App";
import fetchBackend from '../utils/fetchBackend';
import jwt from 'jsonwebtoken';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validator from 'validator';

export const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        fetchBackend(
            'POST',
            'api/auth',
            {
                email: values.email,
                password: values.password
            }
        ).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                throw new Error(error);
            }
            const payload = {
                token: data.token,
                user: jwt.decode(data.token)
            };
            dispatch({
                type: "LOGIN",
                payload: payload
            });
            resetForm();
        }).catch(error => {
            setStatus(error.message);
            console.log(error.message);
        }).finally(() => setSubmitting(false));
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!validator.isEmail(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, status }) => (
                            <Card className="xs-col-2">
                                <Form>
                                    <Field type="email" name="email" />
                                    <ErrorMessage name="email" component="div" />
                                    <Field type="password" name="password" />
                                    <ErrorMessage name="password" component="div" />
                                    <Button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                    {!!status && <ErrorMessage>{status}</ErrorMessage>}
                                </Form>
                            </Card>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
};
export default Login;