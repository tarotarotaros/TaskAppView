export interface Priority {
    id: number;
    name: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    update_count: number;
}

export interface CreatePriority {
    id: number;
    name: string;
    created_by: string;
    updated_by: string;
}
