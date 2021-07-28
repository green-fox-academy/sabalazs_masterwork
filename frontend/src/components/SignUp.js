import React, { useState } from 'react';
import logo from '../bakery-logo.png';
import { Container, Card, Col, Row, Alert, Image } from 'react-bootstrap';
import fetchBackend from '../utils/fetchBackend';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

export const SignUp = () => {
    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be 8 characters at minimum')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])/,
                "Must contain at least one upper case and one lower case character"
            )
            .required('Password is required'),
        passwordConfirm: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref("password"), null], "Passwords don't match")
    });

    const history = useHistory();
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        fetchBackend(
            'POST',
            'api/users',
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
            setFormError('');
            setFormSuccess('Thanks for signing up! Please wait to be redirected to the login page...');
            resetForm();
            setTimeout(() => {
                history.push("/login");
            }, 3000);
        }).catch(error => {
            console.log(error.message);
            setFormError('');
            if (error.message === 'Validation error: Email is already registered.') {
                setFormError('Email is already registered.');
                return;
            }
            if (error.message === 'Authentication error: Email is not recognized.') {
                setFormError('Email is not registered.');
                return;
            }
            setFormError('Oops, something went wrong. Please try again later.');
        }).finally(() => setSubmitting(false));
    };
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} sm={8} md={6} xl={4}>
                    <Formik
                        initialValues={{ email: '', password: '', passwordConfirm: '' }}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ touched, errors, isSubmitting }) => (
                            <Card className="p-3 my-3">
                                <div className="w-100 text-center mb-2">
                                    <Image className="align-self-center" src={logo} fluid/>
                                </div>
                                {formSuccess
                                    ?
                                    <Alert variant='success'>
                                        {formSuccess}
                                    </Alert>
                                    :
                                    <Form>
                                        <h2 className="text-center mb-4">Sign Up</h2>
                                        {formError &&
                                            <Alert variant='danger'>
                                                {formError}
                                            </Alert>}
                                        <div className='form-group mb-3'>
                                            <label htmlFor='email'>Email:</label>
                                            <Field
                                                type='email'
                                                name='email'
                                                placeholder='Enter email'
                                                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage
                                                component='div'
                                                name='email'
                                                className='invalid-feedback'
                                            />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label htmlFor='password'>Password:</label>
                                            <Field
                                                type='password'
                                                name='password'
                                                placeholder='Enter password'
                                                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage
                                                component='div'
                                                name='password'
                                                className='invalid-feedback'
                                            />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label htmlFor='passwordConfirm' className='text-start'>Confirm password:</label>
                                            <Field
                                                type='password'
                                                name='passwordConfirm'
                                                placeholder='Re-enter password'
                                                className={`form-control ${touched.passwordConfirm && errors.passwordConfirm ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage
                                                component='div'
                                                name='passwordConfirm'
                                                className='invalid-feedback'
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className='btn btn-primary w-100 my-2 mx-auto'
                                            disabled={isSubmitting}
                                        >
                                            Sign up
                                        </button>
                                        <Link to='/login'>
                                            <button
                                                type='button'
                                                className='btn btn-outline-primary w-100 my-2 mx-auto'
                                                disabled={isSubmitting}
                                            >
                                                Back to log in
                                            </button>
                                        </Link>
                                    </Form>}
                            </Card>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
};
export default SignUp;