import axios from "axios";
import { ExeResult } from "../types/ExeResult";
import { LoginUser, User } from "../types/User";
import { BASE_URL, getAuthToken } from "./API";
import { IUserService } from "./IUserService";

const USER_API_URL = BASE_URL + "user";
const USERS_API_URL = BASE_URL + "users";

export class UserService implements IUserService {

    private async request(method: 'get' | 'put', url: string, data?: any): Promise<any> {
        try {

            const token = getAuthToken();
            if (!token) return null;
            const response = await axios({
                method,
                url,
                data,
                headers: {
                    Authorization: `Bearer ${token}`,
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

    public async updateUserProject(projectId: number, userId: number): Promise<any> {
        console.log("updateUserProject:" + "userId:" + userId + "projectId:" + projectId);
        return this.request('put', USERS_API_URL + `/${userId}/project`, { project: projectId });
    }

    public async fetchUserProject(userId: number): Promise<any> {
        return this.request('get', USERS_API_URL + `/${userId}/project`);
    }

    public async fetchUserInfo(userId: number): Promise<any> {
        return this.request('get', USERS_API_URL + `/${userId}/`);
    }

    // パスワード変更
    public async updatePassword(userId: string,
        currentPassword: string, newPassword: string, newConfirmPassword: string): Promise<any> {
        try {
            const data = {
                'current_password': currentPassword,
                'new_password': newPassword,
                'new_password_confirmation': newConfirmPassword
            }
            const token = getAuthToken();
            if (!token) return null;

            const response = await axios.post(USERS_API_URL + `/${userId}/change-password`,
                data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('パスワードの変更に失敗しました', error);
            throw error;
        }
    }

    // パスワード変更
    public async deleteUser(userId: string): Promise<any> {
        try {
            const token = getAuthToken();
            if (!token) return null;

            const response = await axios.delete(USERS_API_URL + `/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (error) {
            console.error('ユーザー情報の削除に失敗しました', error);
            throw error;
        }
    }

    // ユーザーログイン
    public async login(loginUser: LoginUser): Promise<ExeResult> {
        try {
            const response = await axios.post(USER_API_URL + "/login", loginUser);
            const token: string = response.data.token;
            sessionStorage.setItem('authToken', token);
            return new ExeResult(true, "ログイン成功");
        } catch (error) {
            return new ExeResult(false, "ログイン失敗");
        }
    }

    // ユーザー登録
    public async signup(signupUser: User): Promise<ExeResult> {
        try {
            await axios.post(USER_API_URL + "/register", signupUser);

            // 自動ログイン
            const loginUserData: LoginUser = {
                email: signupUser.email,
                password: signupUser.password,
            }
            const result = await this.login(loginUserData);
            return result.merge(new ExeResult(true, "ユーザー登録 & 自動ログイン成功"));
        } catch (error) {
            return new ExeResult(false, "ユーザー登録に失敗しました");
        }
    }


}
