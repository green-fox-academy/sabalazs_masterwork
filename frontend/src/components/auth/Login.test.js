import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import ContextWrapper from '../../testUtil';

describe('Login form', () => {
  it('renders correctly', () => {
    const { queryByText, queryAllByText } = render(
      <ContextWrapper isAuthenticated={false}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </ContextWrapper>,
    );
    expect(queryByText('Email cím:')).toBeTruthy();
    expect(queryByText('Jelszó:')).toBeTruthy();
    expect(queryAllByText('Bejelentkezés')).toHaveLength(2);
    expect(queryByText('Regisztráció')).toBeTruthy();
  });
});
