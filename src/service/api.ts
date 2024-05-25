import axios from 'axios';
import { APP_ID, ENDPOINT } from '../constants';

const API_URL = ENDPOINT;
const API_ID = APP_ID;

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'app-id': API_ID }
});
