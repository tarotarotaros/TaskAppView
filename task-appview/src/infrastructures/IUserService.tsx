export interface IUserService {
    fetchAuthUserInfo(): Promise<any>;
    updateUserProject(userId: number, projectId: number): Promise<any>;
    fetchUserProject(userId: number): Promise<any>;
    fetchUserInfo(userId: number): Promise<any>;
}
