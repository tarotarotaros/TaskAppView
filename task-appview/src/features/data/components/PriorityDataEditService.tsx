import { createPriority, deletePriority, fetchPriorities, updatePriority } from "../../../infrastructures/priorities";
import { CreatePriority, Priority } from "../../../types/Priority";
import { DataEditService } from "./DataEditService";

export class PriorityDataEditService implements DataEditService {
    async create(data: CreatePriority): Promise<void> {
        try {
            await createPriority(data);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('優先度の作成に失敗しました', error);
            throw error;
        }
    }

    async update(id: number, data: Priority): Promise<void> {
        try {
            const updateData = { ...data, updated_by: 'システム' };  // 任意のデータ処理を追加
            await updatePriority(id, updateData);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('優先度の更新に失敗しました', error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await deletePriority(id);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('優先度の削除に失敗しました', error);
            throw error;
        }
    }

    async fetch(): Promise<any[]> {
        try {
            const priorities = await fetchPriorities();  // 実際のAPIを呼び出して優先度データを取得
            return priorities;
        } catch (error) {
            console.error('優先度の取得に失敗しました', error);
            throw error;
        }
    }
}
