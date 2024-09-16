import axios from 'axios';
import { SigninUser } from '../types/User';
import { BASE_URL } from './API';

const API_URL = BASE_URL + "user/login";

// ステータスを新規作成
export const signin = async (signinUser: SigninUser) => {
    try {
        const response = await axios.post(API_URL, signinUser);
        const token: string = response.data.token; // トークンが含まれているキー名を適宜変更
        sessionStorage.setItem('authToken', token);
        //return token;
    } catch (error) {
        console.error('ステータスの作成に失敗しました', error);
        throw error;
    }
};

