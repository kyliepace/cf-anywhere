import axios from 'axios';
import { CHANGE_AUTH } from 'actions/types';

export function changeAuth(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}
