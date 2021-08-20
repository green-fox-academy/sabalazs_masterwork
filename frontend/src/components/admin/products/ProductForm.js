import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import fetchBackend from '../../../utils/fetchBackend';
import AuthContext from '../../../AuthContext';

export default function ProductForm({ productId }) {
  const history = useHistory();
  const editing = !!productId;

  const [labels, setLabels] = useState([]);

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .required('Hiányzó név'),
    price: Yup.number()
      .min(1, 'Hibás ár')
      .required('Hiányzó ár'),
    isAvailable: Yup.boolean(),
  });

  const [product, setProduct] = useState({
    name: '',
    price: '',
    isAvailable: true,
    labels: [],
    image: '',
  });

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    fetchBackend(
      'GET',
      'api/labels',
      undefined,
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      setLabels(data.map((item) => item.name));
    }).catch(() => {
      dispatch({
        type: 'SET_FEEDBACK',
        payload: {
          variant: 'danger',
          message: 'Hoppá, valami elromlott. :( ',
        },
      });
    });
    if (editing) {
      fetchBackend(
        'GET',
        `api/products/${productId}`,
        undefined,
      ).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }
        setProduct({
          name: data.name,
          price: data.price,
          isAvailable: data.isAvailable,
          labels: [...data.labels],
          image: data.image,
        });
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
  }, []);

  function handleSubmit(values, { setSubmitting, resetForm }) {
    dispatch({
      type: 'CLEAR_FEEDBACK',
    });
    const method = editing ? 'PUT' : 'POST';
    const endpoint = editing ? `api/products/${productId}` : 'api/products';
    fetchBackend(
      method,
      endpoint,
      {
        name: values.name,
        price: values.price,
        isAvailable: values.isAvailable,
        labels: [...values.labels],
      },
    ).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
      return data;
    }).then(async (data) => {
      if (values.file) {
        const formData = new FormData();
        formData.append('file', values.file);
        const methodImg = editing && product.image ? 'PUT' : 'POST';
        await fetchBackend(
          methodImg,
          `api/images/${data.id || data._id}`,
          formData,
          true,
        ).then(async (response) => {
          const responseData = await response.json();
          if (!response.ok) {
            const error = (responseData && responseData.message) || response.status;
            throw new Error(error);
          }
        });
      }
      dispatch({
        type: 'SET_FEEDBACK',
        payload: {
          variant: 'success',
          message: 'Sikeres mentés',
        },
      });
      resetForm();
      if (editing) setTimeout(() => history.push('/admin/products'), 1000);
    }).catch((error) => {
      let errorMessage = 'Hoppá, valami elromlott. :( ';
      if (error.message === 'Validation error: A product with the same name already exists.') {
        errorMessage = 'A mentés nem sikerült, mert már létezik termék ezen a néven.';
      } else if (error.message === 'Validation error: File size is over the limit') {
        errorMessage = 'A kép feltöltés nem sikerült, a fájl mérete túl nagy.';
      }
      dispatch({
        type: 'SET_FEEDBACK',
        payload: {
          variant: 'danger',
          message: errorMessage,
        },
      });
    })
      .finally(() => setSubmitting(false));
  }

  return (
    <Container>
      <Col xs={12} sm={12} md={10} xl={8} className="m-auto">
        <Formik
          enableReinitialize
          initialValues={{
            name: product.name,
            price: product.price,
            isAvailable: product.isAvailable,
            labels: product.labels,
          }}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          {({
            touched,
            errors,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="name">Név:</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Termék neve"
                  className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                />
                <ErrorMessage
                  component="div"
                  name="name"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="price">Ár:</label>
                <Field
                  type="number"
                  name="price"
                  min={1}
                  placeholder="Termék ára"
                  className={`form-control ${touched.price && errors.price ? 'is-invalid' : ''}`}
                />
                <ErrorMessage
                  component="div"
                  name="price"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="file">Kép:</label>
                <input
                  id="file"
                  name="image"
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <Field type="checkbox" name="isAvailable" />
                  <span className="mx-2">Rendelhető</span>
                </label>
              </div>
              <div className="form-group mb-3">
                <h3>Címkék:</h3>
                {labels.map((label) => (
                  <label key={label}>
                    <Field type="checkbox" name="labels" value={label} />
                    <span className="mx-2">{label}</span>
                  </label>
                ))}
              </div>
              <Row className="mt-5">
                <Col xs={5} md={4} xl={2}>
                  <Link to="/admin/products">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 my-2 mx-auto"
                      disabled={isSubmitting}
                    >
                      Vissza
                    </button>
                  </Link>
                </Col>
                <Col />
                <Col xs={5} md={4} xl={2}>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 my-2 mx-auto"
                    disabled={isSubmitting}
                  >
                    Mentés
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
}
