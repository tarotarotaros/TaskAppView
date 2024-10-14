import axios from 'axios';
import { CreateProject } from '../types/Project';
import { BASE_URL, getAuthToken } from './API';

const ASSIGNEE_API_URL = BASE_URL + "projects";

// プロジェクト一覧を取得
export const fetchProjects = async () => {
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
        return response.data;
    } catch (error) {
        console.error('プロジェクトの取得に失敗しました', error);
        throw error;
    }
};

export const fetchProject = async (projectId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.get(ASSIGNEE_API_URL + `/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        console.error('プロジェクトの取得に失敗しました', error);
        throw error;
    }
};

// プロジェクトを新規作成
export const createProject = async (projectData: CreateProject) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.post(ASSIGNEE_API_URL, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('プロジェクトの作成に失敗しました', error);
        throw error;
    }
};


// プロジェクトを更新
export const updateProject = async (projectId: number, projectData: Partial<CreateProject>) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        const response = await axios.put(`${ASSIGNEE_API_URL}/${projectId}`, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('プロジェクトの更新に失敗しました', error);
        throw error;
    }
};


// プロジェクトを削除
export const deleteProject = async (projectId: number) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('認証トークンが見つかりません。ログインが必要です。');
    }

    try {
        await axios.delete(`${ASSIGNEE_API_URL}/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('プロジェクトの削除に失敗しました', error);
        throw error;
    }
};

