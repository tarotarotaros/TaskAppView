import axios from 'axios';
import { ExeResult } from '../types/ExeResult';
import { CreateTask, TaskClass } from '../types/Task';
import { fetchData } from '../types/User';
import { BASE_URL, getAuthToken } from './API';

const TASK_API_URL = BASE_URL + "tasks";
const FAULSE_GET_TOKEN_MESSAGE: string = "ユーザー認証情報の取得に失敗しました";

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

export async function fetchTasksWhereUser(userId: number): Promise<fetchData<TaskClass[]>> {
    const token = getAuthToken();
    if (!token) return new fetchData<TaskClass[]>(new ExeResult(false, FAULSE_GET_TOKEN_MESSAGE), []);

    try {
        const response = await axios.get(TASK_API_URL + `/${userId}/whereUser`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        const data = response.data;
        const taksList: TaskClass[] = data.map((task: any) => new TaskClass(
            task.task_id,
            task.task_name,
            task.content,
            task.priority,
            task.deadline,
            task.start,
            task.end,
            task.project,
            task.status,
            task.miled,
            task.milestone,
            task.assignee,
            task.created_by,
            task.updated_by,
            task.created_at,
            task.updated_at,
            task.update_count
        ));

        return new fetchData<TaskClass[]>(new ExeResult(true, response.data), taksList);
    } catch (error: any) {
        return new fetchData<TaskClass[]>(new ExeResult(false, error.data.responce), []);
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

