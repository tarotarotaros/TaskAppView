import axios from 'axios';
import { CreateAssignee } from '../types/Assignee';
import { BASE_URL, getAuthToken } from './API';

const ASSIGNEE_API_URL = BASE_URL + "assignees";

export const fetchAssignees = async () => {
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
        console.error('タスクの取得に失敗しました', error);
        throw error;
    }
};

// 担当者を新規作成
export const createAssignee = async (assigneeData: CreateAssignee) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.post(ASSIGNEE_API_URL, assigneeData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('タスクの作成に失敗しました', error);
        throw error;
    }
};


// 担当者を更新
export const updateAssignee = async (assigneeId: number, assigneeData: Partial<CreateAssignee>) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.put(`${ASSIGNEE_API_URL}/${assigneeId}`, assigneeData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('タスクの更新に失敗しました', error);
        throw error;
    }
};


// 担当者を削除
export const deleteAssignee = async (assigneeId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        await axios.delete(`${ASSIGNEE_API_URL}/${assigneeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('タスクの削除に失敗しました', error);
        throw error;
    }
};

