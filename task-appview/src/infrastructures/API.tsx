export const API_URL = process.env.API_URL
export const BASE_URL = `${API_URL}/api/`
export const getAuthToken = () => sessionStorage.getItem('authToken');

