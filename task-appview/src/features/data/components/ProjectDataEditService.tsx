import { createProject, deleteProject, fetchProjects, updateProject } from "../../../infrastructures/projects";
import { CreateProject, Project } from "../../../types/Project";
import { DataEditService } from "./DataEditService";

export class ProjectDataEditService implements DataEditService {
    async create(data: CreateProject): Promise<void> {
        try {
            console.log(data);
            await createProject(data);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('プロジェクトの作成に失敗しました', error);
            throw error;
        }
    }

    async update(id: number, data: Project): Promise<void> {
        try {
            const updateData = { ...data, updated_by: 'システム' };  // 任意のデータ処理を追加
            await updateProject(id, updateData);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('プロジェクトの更新に失敗しました', error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await deleteProject(id);  // 実際の依存関数を呼び出す
        } catch (error) {
            console.error('プロジェクトの削除に失敗しました', error);
            throw error;
        }
    }

    async fetch(): Promise<any[]> {
        try {
            const priorities = await fetchProjects();  // 実際のAPIを呼び出してプロジェクトデータを取得
            return priorities;
        } catch (error) {
            console.error('プロジェクトの取得に失敗しました', error);
            throw error;
        }
    }
}
