// src/types/Task.ts

export interface Task {
    task_id: number;
    task_name: string;
    content?: string;
    priority?: number;
    deadline?: Date;
    project?: number;
    status?: number;
    miled?: number;
    milestone?: string;
    manager?: number;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    update_count: number;
}

export interface CreateTask {
    task_name: string;
    content?: string;
    priority?: number;
    deadline?: Date;
    project?: number;
    status?: number;
    miled?: number;
    milestone?: string;
    manager?: number;
    created_by: string;
    updated_by: string;
}
