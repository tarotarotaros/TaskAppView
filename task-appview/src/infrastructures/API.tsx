export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/`
export const getAuthToken = () => sessionStorage.getItem('authToken');

