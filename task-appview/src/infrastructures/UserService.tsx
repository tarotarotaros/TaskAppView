import axios from "axios";
import { BASE_URL, getAuthToken } from "./API";
import { IUserService } from "./IUserService";

const USER_API_URL = BASE_URL + "user";
const USERS_API_URL = BASE_URL + "users";

export class UserService implements IUserService {
    private token: string | null;

    constructor() {
        this.token = getAuthToken();
        if (!this.token) {
            throw new Error('認証トークンが見つかりません。ログインが必要です。');
        }
    }

    private async request(method: 'get' | 'put', url: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method,
                url,
                data,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('APIリクエストに失敗しました', error);
            throw error;
        }
    }

    public async fetchAuthUserInfo(): Promise<any> {
        return this.request('get', USER_API_URL);
    }

    public async updateUserProject(userId: number, projectId: number): Promise<any> {
        return this.request('put', USERS_API_URL + `/${userId}/project`, { project: projectId });
    }

    public async fetchUserProject(userId: number): Promise<any> {
        return this.request('get', USERS_API_URL + `/${userId}/project`);
    }

    public async fetchUserInfo(userId: number): Promise<any> {
        return this.request('get', USERS_API_URL + `/${userId}/`);
    }
}
