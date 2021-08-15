import React, { useContext } from 'react';
import { Alert, Col, Container } from 'react-bootstrap';
import AuthContext from '../AuthContext';

export default function Feedback() {
  const { dispatch, state } = useContext(AuthContext);

  return (
    <Container>
      <Col xs={12} sm={12} md={10} xl={8} className="m-auto">
        <Alert
          variant={state.alert.variant}
          className="m-2"
          onClose={() => dispatch({
            type: 'CLEAR_FEEDBACK',
          })}
          dismissible
        >
          {state.alert.message}
        </Alert>
      </Col>
    </Container>
  );
}
