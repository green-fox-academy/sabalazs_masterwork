const initialState = {
  isAuthenticated: !!localStorage.getItem('user'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: JSON.parse(localStorage.getItem('token')) || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  alert: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        alert: null,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        alert: null,
        cart: [],
      };
    case 'CLEAR_FEEDBACK':
      return {
        ...state,
        alert: null,
      };
    case 'SET_FEEDBACK':
      return {
        ...state,
        alert: {
          variant: action.payload.variant,
          message: action.payload.message,
        },
      };
    case 'ADD_TO_CART':
      localStorage.setItem('cart', JSON.stringify([...state.cart, action.payload]));
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART': {
      const newCart = [...state.cart];
      newCart.splice(action.payload.index, 1);
      localStorage.setItem('cart', JSON.stringify([...newCart]));
      return {
        ...state,
        cart: [...newCart],
      };
    }
    case 'EMPTY_CART':
      localStorage.setItem('cart', JSON.stringify([]));
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export { initialState, reducer };
