import React, { useState } from 'react';
import {
  Container, Card, Col, Row, Alert, Image,
} from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import fetchBackend from '../../utils/fetchBackend';
import logo from '../../bakery-logo.png';

export const SignUp = () => {
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('Hibás email cím formátum')
      .required('Hiányzó email cím'),
    password: Yup.string()
      .min(8, 'A jelszónak legalább 8 karakterből kell állnia')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'A jelszónak tartalmaznia kell legalább egy nagy és legalább egy kis betűt',
      )
      .required('Hiányzó jelszó'),
    passwordConfirm: Yup.string()
      .required('Hiányzó jelszó')
      .oneOf([Yup.ref('password'), null], 'A két jelszó nem egyezik'),
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
        password: values.password,
      },
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      setFormError('');
      setFormSuccess('Köszönjük a regisztrációt! Most átírányítunk a bejelentkezésre...');
      resetForm();
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }).catch((error) => {
      setFormError('');
      if (error.message === 'Validation error: Email is already registered.') {
        setFormError('Az email cím már regisztrálva van.');
        return;
      }
      setFormError('Upsz, valami elromlott. Kérjük nézz vissza később.');
    }).finally(() => setSubmitting(false));
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={8} md={6} xl={4}>
          <Formik
            initialValues={{ email: '', password: '', passwordConfirm: '' }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting }) => (
              <Card className="p-3 my-3 shadow bg-body rounded">
                <div className="w-100 text-center mb-2">
                  <Image className="align-self-center" src={logo} fluid />
                </div>
                {formSuccess
                  ? (
                    <Alert variant="success">
                      {formSuccess}
                    </Alert>
                  )
                  : (
                    <Form>
                      <h2 className="text-center mb-4">Regisztráció</h2>
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
                      <div className="form-group mb-3">
                        <label htmlFor="passwordConfirm" className="text-start">Jelszó megerősítés:</label>
                        <Field
                          type="password"
                          name="passwordConfirm"
                          placeholder="Jelszó ismét"
                          className={`form-control ${touched.passwordConfirm && errors.passwordConfirm ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="passwordConfirm"
                          className="invalid-feedback"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 my-2 mx-auto"
                        disabled={isSubmitting}
                      >
                        Regisztráció
                      </button>
                      <Link to="/login">
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100 my-2 mx-auto"
                          disabled={isSubmitting}
                        >
                          Vissza a bejelentkezéshez
                        </button>
                      </Link>
                    </Form>
                  )}
              </Card>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
