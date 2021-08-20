import React from 'react';
import { render } from '@testing-library/react';
import SignUp from './SignUp';
import ContextWrapper from '../../testUtil';
import { MemoryRouter } from 'react-router-dom';

describe('Registration form', () => {
  it('renders correctly', () => {
    const { queryByText, queryAllByText } = render(    
      <ContextWrapper isAuthenticated={false}>
        <MemoryRouter>
          <SignUp/>
        </MemoryRouter>
      </ContextWrapper>
      );
    expect(queryByText('Email cím:')).toBeTruthy();
    expect(queryByText('Jelszó:')).toBeTruthy();
    expect(queryByText('Jelszó megerősítés:')).toBeTruthy();
    expect(queryAllByText('Regisztráció').length).toBe(2);
    expect(queryByText('Vissza a bejelentkezéshez')).toBeTruthy();
  });
});
