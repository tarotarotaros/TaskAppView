import axios from 'axios';
import { CreatePriority } from '../types/Priority';
import { BASE_URL, getAuthToken } from './API';

const ASSIGNEE_API_URL = BASE_URL + "priorities";

// 優先順位一覧を取得
export const fetchPriorities = async () => {
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
        console.error('優先順位の取得に失敗しました', error);
        throw error;
    }
};

// 優先順位を新規作成
export const createPriority = async (priorityData: CreatePriority) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.post(ASSIGNEE_API_URL, priorityData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('優先順位の作成に失敗しました', error);
        throw error;
    }
};


// 優先順位を更新
export const updatePriority = async (priorityId: number, priorityData: Partial<CreatePriority>) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.put(`${ASSIGNEE_API_URL}/${priorityId}`, priorityData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('優先順位の更新に失敗しました', error);
        throw error;
    }
};


// 優先順位を削除
export const deletePriority = async (priorityId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        await axios.delete(`${ASSIGNEE_API_URL}/${priorityId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('優先順位の削除に失敗しました', error);
        throw error;
    }
};

