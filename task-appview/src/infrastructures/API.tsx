export const API_URL = import.meta.env.VITE_API_URL;
export const BASE_URL = API_URL + '/api/';
export const getAuthToken = () => sessionStorage.getItem('authToken');

