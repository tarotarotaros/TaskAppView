import axios from 'axios';
import { SigninUser, SignupUser } from '../types/User';
import { BASE_URL } from './API';

const API_URL = BASE_URL + "user/";

// ユーザーサインイン
export const signin = async (signinUser: SigninUser) => {
    try {
        const response = await axios.post(API_URL + "login", signinUser);
        const token: string = response.data.token; // トークンが含まれているキー名を適宜変更
        sessionStorage.setItem('authToken', token);
        //return token;
    } catch (error) {
        console.error('ユーザーサインインに失敗しました', error);
        throw error;
    }
};

// ユーザー登録
export const signup = async (signupUser: SignupUser) => {
    try {
        await axios.post(API_URL + "register", signupUser);

        // 自動ログイン
        const signinUserData = {
            email: signupUser.email,
            password: signupUser.password,
        }
        await signin(signinUserData);
    } catch (error) {
        console.error('ユーザーサインアップに失敗しました', error);
        throw error;
    }
};

