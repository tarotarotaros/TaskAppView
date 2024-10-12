import { SigninUser, User } from "../types/User";

export interface IUserService {
    fetchAuthUserInfo(): Promise<any>;
    updateUserProject(userId: number, projectId: number): Promise<any>;
    fetchUserProject(userId: number): Promise<any>;
    fetchUserInfo(userId: number): Promise<any>;
    updatePassword(userId: string, currentPassword: string, newPassword: string, newConfirmPassword: string): Promise<any>;
    signin(signinUser: SigninUser): Promise<void>;
    signup(signupUser: User): Promise<void>;
}
