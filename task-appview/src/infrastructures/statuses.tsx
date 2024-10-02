import axios from 'axios';
import { CreateStatus, Status } from '../types/Status';
import { BASE_URL, getAuthToken } from './API';

const ASSIGNEE_API_URL = BASE_URL + "statuses";

// ステータス一覧を取得
export const fetchStatuses = async () => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.get(ASSIGNEE_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('ステータスの取得に失敗しました', error);
        throw error;
    }
};

// ステータスを新規作成
export const createStatus = async (statusData: CreateStatus) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.post(ASSIGNEE_API_URL, statusData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('ステータスの作成に失敗しました', error);
        throw error;
    }
};


// ステータスを更新
export const updateStatus = async (statusId: number, statusData: Partial<Status>) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.put(`${ASSIGNEE_API_URL}/${statusId}`, statusData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(statusData);
        return response.data;
    } catch (error) {
        console.error('ステータスの更新に失敗しました', error);
        throw error;
    }
};


// ステータスを削除
export const deleteStatus = async (statusId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        await axios.delete(`${ASSIGNEE_API_URL}/${statusId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('ステータスの削除に失敗しました', error);
        throw error;
    }
};

