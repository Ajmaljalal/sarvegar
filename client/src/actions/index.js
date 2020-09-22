import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';


export const fetchUser = () => async dispatch => {
  let res = await axios.get('/api/current_user')
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
}

export const handleToken = (token) => async dispatch => {
  let res = await axios.post('/api/pay', token)
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
}

export const submitSurvey = (values, history) => async dispatch => {
  let res = await axios.post('/api/surveys', values)

  history.push('/dashboard');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
}

export const fetchSurveys = () => async dispatch => {
  let res = await axios.get('/api/surveys');
  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  })
}