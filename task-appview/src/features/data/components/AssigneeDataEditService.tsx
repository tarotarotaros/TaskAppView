import { createAssignee, deleteAssignee, fetchAssignees, updateAssignee } from "../../../infrastructures/assignees";
import { CreateAssignee } from "../../../types/Assignee";
import { DataEditService } from "./DataEditService";

export class AssigneeDataEditService implements DataEditService {
    async create(data: CreateAssignee): Promise<void> {
        try {
            await createAssignee(data);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('ステータスの作成に失敗しました', error);
            throw error;
        }
    }

    async update(id: number, data: any): Promise<void> {
        try {
            const updateData = { ...data, updated_by: 'システム' };  // 任意のデータ処理を追加
            await updateAssignee(id, updateData);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('ステータスの更新に失敗しました', error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await deleteAssignee(id);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('ステータスの削除に失敗しました', error);
            throw error;
        }
    }

    async fetch(): Promise<any[]> {
        try {
            const assignees = await fetchAssignees();  // 実際のAPIを呼び出して優先度データを取得
            return assignees;
        } catch (error) {
            console.error('ステータスの取得に失敗しました', error);
            throw error;
        }
    }
}
