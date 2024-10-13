import axios from "axios";
import { ExeResult } from "../types/ExeResult";
import { fetchUserInfo, LoginUser, User } from "../types/User";
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

    public async fetchAuthUserInfo(): Promise<fetchUserInfo> {
        try {
            const token = getAuthToken();
            if (!token) return new fetchUserInfo(new ExeResult(false, "ユーザー情報の取得に失敗しました"), new User("", "", ""));

            const response = await axios.get(
                USER_API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            const data = response.data;
            return new fetchUserInfo(new ExeResult(true, "ユーザー情報の取得に成功しました"), new User(data.name, data.email, data.password, data.id, data.projectId));
        } catch {
            return new fetchUserInfo(new ExeResult(false, "ユーザー情報の取得に失敗しました"), new User("", "", ""));
        }
    }

    public async updateUserProject(projectId: number, userId: number): Promise<any> {
        return this.request('put', USERS_API_URL + `/${userId}/project`, { project: projectId });
    }

    public async updateUser(userId: number, username: string, email: string, password: string): Promise<ExeResult> {
        try {
            const data = {
                'name': username,
                'email': email,
                'current_password': password,
                'updated_by': userId
            }

            const token = getAuthToken();
            if (!token) return new ExeResult(false, "ユーザー情報の取得に失敗しました");

            const response = await axios.put(
                USERS_API_URL + `/${userId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status) return new ExeResult(false, response.data.error);

            return new ExeResult(true, "ユーザー情報の更新に成功しました");
        } catch (error: any) {
            return new ExeResult(false, error.response.data);
        }

    }

    public async fetchUserProject(userId: number): Promise<any> {
        return this.request('get', USERS_API_URL + `/${userId}/project`);
    }

    public async fetchUserInfo(userId: number): Promise<any> {
        return this.request('get', USERS_API_URL + `/${userId}/`);
    }

    // パスワード変更
    public async updatePassword(userId: number,
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
    public async deleteUser(userId: number): Promise<any> {
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
    public async register(registerUser: User): Promise<ExeResult> {
        try {
            await axios.post(USER_API_URL + "/register", registerUser);

            // 自動ログイン
            const loginUserData: LoginUser = {
                email: registerUser.email,
                password: registerUser.password,
            }
            const result = await this.login(loginUserData);
            return result.merge(new ExeResult(true, "ユーザー登録 & 自動ログイン成功"));
        } catch (error) {
            return new ExeResult(false, "ユーザー登録に失敗しました");
        }
    }


}
