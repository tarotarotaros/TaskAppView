export const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const BASE_URL = API_URL + '/api/';
export const getAuthToken = () => sessionStorage.getItem('authToken');

