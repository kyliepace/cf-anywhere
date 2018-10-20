import { AUTH_USER, UPDATE_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signup = (formProps, callback) => async dispatch => {
  console.log(formProps)
  try {
    const response = await axios.post(
      'http://localhost:3060/register',
      formProps
    );
    console.log(response)

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    console.log(e)
    dispatch({ type: AUTH_ERROR, payload: 'registration failed.' });
  }
};

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