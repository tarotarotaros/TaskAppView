import { createPriority, deletePriority, updatePriority } from "../../../infrastructures/priorities";
import { CreatePriority, Priority } from "../../../types/Priority";
import { PriorityService } from "./PriorityService";

export class PriorityServiceImpl implements PriorityService {
    async createPriority(data: CreatePriority): Promise<void> {
        try {
            await createPriority(data);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('優先度の作成に失敗しました', error);
            throw error;
        }
    }

    async updatePriority(id: number, data: Priority): Promise<void> {
        try {
            const updateData = { ...data, updated_by: 'システム' };  // 任意のデータ処理を追加
            await updatePriority(id, updateData);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('優先度の更新に失敗しました', error);
            throw error;
        }
    }

    async deletePriority(priorityId: number): Promise<void> {
        try {
            await deletePriority(priorityId);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('優先度の削除に失敗しました', error);
            throw error;
        }
    }
}
