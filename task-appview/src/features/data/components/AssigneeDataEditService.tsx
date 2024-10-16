import { CreateAssignee } from "../../../types/Assignee";
import { DataEditService } from "./DataEditService";

import { UserService } from "../../../infrastructures/UserService";

export class AssigneeDataEditService implements DataEditService {
    async create(data: CreateAssignee): Promise<void> {

    }

    async update(id: number, data: any): Promise<void> {

    }

    async delete(id: number): Promise<void> {

    }

    async fetch(): Promise<any[]> {
        try {
            const userService = new UserService();
            const fetchResult = await userService.fetchUserList();  // 実際のAPIを呼び出して優先度データを取得
            const userList = fetchResult.Data;
            return userList;
        } catch (error) {
            console.error('ステータスの取得に失敗しました', error);
            throw error;
        }
    }
}
