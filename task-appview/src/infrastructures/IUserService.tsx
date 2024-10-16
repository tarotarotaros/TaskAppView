import { ExeResult } from "../types/ExeResult";
import { fetchData, fetchUserInfo, LoginUser, User } from "../types/User";

export interface IUserService {
    fetchAuthUserInfo(): Promise<fetchUserInfo>;
    updateUserProject(projectId: number, userId: number): Promise<any>;
    updateUser(userId: number, username: string, email: string, password: string): Promise<ExeResult>;
    fetchUserList(): Promise<fetchData<User[]>>
    fetchUserProject(userId: number): Promise<any>;
    fetchUserInfo(userId: number): Promise<any>;
    updatePassword(userId: number, currentPassword: string, newPassword: string, newConfirmPassword: string): Promise<ExeResult>;
    deleteUser(userId: number): Promise<any>;
    login(loginUser: LoginUser): Promise<ExeResult>;
    register(registerUser: User): Promise<ExeResult>;
}