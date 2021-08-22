import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SignUp } from './SignUp';
import ContextWrapper from '../../testUtil';

describe('Registration form', () => {
  it('renders correctly', () => {
    const { queryByText, queryAllByText } = render(
      <ContextWrapper isAuthenticated={false}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </ContextWrapper>,
    );
    expect(queryByText('Email cím:')).toBeTruthy();
    expect(queryByText('Jelszó:')).toBeTruthy();
    expect(queryByText('Jelszó megerősítés:')).toBeTruthy();
    expect(queryAllByText('Regisztráció')).toHaveLength(2);
    expect(queryByText('Vissza a bejelentkezéshez')).toBeTruthy();
  });
});
