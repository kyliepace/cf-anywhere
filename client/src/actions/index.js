import axios from 'axios';
import { AUTH_USER, UPDATE_USER } from './types';

export function changeAuth(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export const logIn = (user, token) => dispatch => {
  dispatch({
    type: AUTH_USER,
    payload: token
  });

  dispatch({
    type: UPDATE_USER,
    payload: user
  });
};

export const logOut = e => dispatch => {
  e.preventDefault();
  localStorage.removeItem('token');

  dispatch({
    type: AUTH_USER,
    payload: ''
  });
};