
export interface Status {
    id: number;
    name: string;
    color: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    update_count: number;
}

export interface CreateStatus {
    id: number;
    name: string;
    color: string;
    created_by: string;
    updated_by: string;
}
