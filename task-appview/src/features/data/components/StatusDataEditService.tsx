import { createStatus, deleteStatus, fetchStatuses, updateStatus } from "../../../infrastructures/statuses";
import { CreateStatus } from "../../../types/Status";
import { DataEditService } from "./DataEditService";

export class StatusDataEditService implements DataEditService {
    async create(data: CreateStatus): Promise<void> {
        try {
            await createStatus(data);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('ステータスの作成に失敗しました', error);
            throw error;
        }
    }

    async update(id: number, data: any): Promise<void> {
        try {
            const updateData = { ...data, updated_by: 'システム' };  // 任意のデータ処理を追加
            await updateStatus(id, updateData);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('ステータスの更新に失敗しました', error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await deleteStatus(id);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('ステータスの削除に失敗しました', error);
            throw error;
        }
    }

    async fetch(): Promise<any[]> {
        try {
            const statuses = await fetchStatuses();  // 実際のAPIを呼び出して優先度データを取得
            return statuses;
        } catch (error) {
            console.error('ステータスの取得に失敗しました', error);
            throw error;
        }
    }
}
