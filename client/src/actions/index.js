import { AUTH_USER, UPDATE_USER, AUTH_ERROR } from './types';
import { ADDED_WOD, WOD_ERROR } from './types';
import { ADD_MOVEMENT } from './types';
import axios from 'axios';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3060/register',
      formProps
    );
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.token);
    callback(null);
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'registration failed.' });
    callback(e);
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3060/auth/login',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback(null);
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    callback(e);
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
  localStorage.setItem('token', token);
};

export const logout = () => dispatch => {
  //e.preventDefault();
  localStorage.removeItem('token');

  dispatch({
    type: AUTH_USER,
    payload: ''
  });
};

export const addWod = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3060/wod',
      formProps
    );

    dispatch({ type: ADDED_WOD, payload: response.data });
    callback(null);
  } catch (e) {
    dispatch({ type: WOD_ERROR, payload: 'Error saving wod' });
    callback(e);
  }
}

export const addMovement = () => async dispatch => {
  dispatch({
    type: ADD_MOVEMENT,
    payload: {}
  });
}