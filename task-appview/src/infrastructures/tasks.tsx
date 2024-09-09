// src/api/tasks.ts

import axios from 'axios';
import { CreateTask } from '../types/Task';

const API_URL = 'http://localhost:8000/api/tasks';

// セッションストレージからトークンを取得
const getAuthToken = () => sessionStorage.getItem('authToken');

// タスク一覧を取得

export const fetchTasks = async () => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('タスクの取得に失敗しました', error);
        throw error;
    }
};

// タスクを新規作成
export const createTask = async (taskData: CreateTask) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.post(API_URL, taskData, {
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


// タスクを更新
export const updateTask = async (taskId: number, taskData: Partial<CreateTask>) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
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


// タスクを削除
export const deleteTask = async (taskId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        await axios.delete(`${API_URL}/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('タスクの削除に失敗しました', error);
        throw error;
    }
};

