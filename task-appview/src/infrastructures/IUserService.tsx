import { ExeResult } from "../types/ExeResult";
import { SigninUser, User } from "../types/User";

export interface IUserService {
    fetchAuthUserInfo(): Promise<any>;
    updateUserProject(projectId: number, userId: number): Promise<any>;
    fetchUserProject(userId: number): Promise<any>;
    fetchUserInfo(userId: number): Promise<any>;
    updatePassword(userId: string, currentPassword: string, newPassword: string, newConfirmPassword: string): Promise<any>;
    deleteUser(userId: string): Promise<any>;
    signin(signinUser: SigninUser): Promise<ExeResult>;
    signup(signupUser: User): Promise<ExeResult>;
}
