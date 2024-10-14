import axios from 'axios';
import { CreateTask } from '../types/Task';
import { BASE_URL, getAuthToken } from './API';

const TASK_API_URL = BASE_URL + "tasks";

// タスク一覧を取得
export const fetchTasks = async (projectId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.get(TASK_API_URL + `/${projectId}`,
            {
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

// タスクを新規作成
export const createTask = async (taskData: CreateTask, userId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.post(
            TASK_API_URL + `/${userId}`,
            taskData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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
        const response = await axios.put(`${TASK_API_URL}/${taskId}`, taskData, {
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
        await axios.delete(`${TASK_API_URL}/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('タスクの削除に失敗しました', error);
        throw error;
    }
};

