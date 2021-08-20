import React, { useState, useContext } from 'react';
import {
  Container, Card, Col, Row, Alert, Image,
} from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import fetchBackend from '../../utils/fetchBackend';
import AuthContext from '../../AuthContext';
import logo from '../../bakery-logo.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Hibás email cím formátum')
    .required('Hiányzik az email cím'),
  password: Yup.string()
    .required('Hiányzik a jelszó'),
});

export default function Login() {
  const [formError, setFormError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    fetchBackend(
      'POST',
      'api/auth',
      {
        email: values.email,
        password: values.password,
      },
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      setFormError('');
      const payload = {
        token: data.token,
        user: jwt.decode(data.token),
      };
      dispatch({
        type: 'LOGIN',
        payload,
      });
      resetForm();
      history.push('/');
    }).catch((error) => {
      setFormError('');
      if (error.message === 'Authentication error: Invalid password.') {
        setFormError('Invalid password.');
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
      <Row className="justify-content-md-center">
        <Col xs={12} sm={8} md={6} xl={4}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting }) => (
              <Card className="p-3 my-3 shadow bg-body rounded">
                <Form>
                  <div className="w-100 text-center mb-2">
                    <Image className="align-self-center" src={logo} fluid />
                  </div>
                  <h2 className="text-center mb-4">Bejelentkezés</h2>
                  {formError
                    && (
                    <Alert variant="danger">
                      {formError}
                    </Alert>
                    )}
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email cím:</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email cím"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Jelszó:</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Jelszó"
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 my-2 mx-auto"
                    disabled={isSubmitting}
                  >
                    Bejelentkezés
                  </button>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 my-2 mx-auto"
                      disabled={isSubmitting}
                    >
                      Regisztráció
                    </button>
                  </Link>
                </Form>
              </Card>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
