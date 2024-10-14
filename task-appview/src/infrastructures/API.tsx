export const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;
export const BASE_URL = API_URL + '/api/';
export const getAuthToken = () => sessionStorage.getItem('authToken');

