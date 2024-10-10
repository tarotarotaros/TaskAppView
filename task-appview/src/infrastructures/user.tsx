import axios from "axios";
import { BASE_URL, getAuthToken } from "./API";

const USER_API_URL = BASE_URL + "user";
const USERS_API_URL = BASE_URL + "users";

export const fetchAuthUserInfo = async () => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        if (token) {
            const response = await axios.get(USER_API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } else {
            console.error('認証トークンが見つかりません');
        }
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error);
        throw error;
    }
};


export const UpdateUserProject = async (projectId: number, userId: number) => {
    const token = getAuthToken();
    try {
        if (token) {
            const response = await axios.put
                (
                    USERS_API_URL + `/${userId.toString()}/project`,
                    {
                        project: projectId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            return response.data;
        } else {
            console.error('認証トークンが見つかりません');
        }
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error);
        throw error;
    }
};


export const fetchUserProject = async (userId: number) => {
    const token = getAuthToken();
    try {
        if (token) {
            const response = await axios.get
                (
                    USERS_API_URL + `/${userId.toString()}/project`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            return response.data;
        } else {
            console.error('認証トークンが見つかりません');
        }
    } catch (error) {
        console.error('ユーザープロジェクト情報の取得に失敗しました', error);
        throw error;
    }
};

// プロジェクト一覧を取得
export const fetchUserInfo = async (userId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.get(
            USERS_API_URL + `/${userId.toString()}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました', error);
        throw error;
    }
};