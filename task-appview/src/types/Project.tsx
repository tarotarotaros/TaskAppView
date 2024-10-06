export interface Project {
    id: number;
    name: string;
    is_completed: boolean;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    update_count: number;
}

export interface CreateProject {
    id: number;
    name: string;
    is_completed: boolean;
    created_by: string;
    updated_by: string;
}
