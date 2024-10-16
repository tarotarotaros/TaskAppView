// src/types/Task.ts

export interface Task {
    task_id: number;
    task_name: string;
    content?: string;
    priority?: number;
    deadline?: Date;
    start?: Date;
    end?: Date;
    project?: number;
    status?: number;
    miled?: number;
    milestone?: string;
    assignee: number;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    update_count: number;
}

export class TaskClass {

    task_id: number;
    task_name: string;
    content: string;
    priority: number;
    deadline: Date;
    start: Date;
    end: Date;
    project: number;
    status: number;
    miled: number;
    milestone: string;
    assignee: number;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
    update_count: number;

    constructor(
        task_id: number,
        task_name: string,
        content: string,
        priority: number,
        deadline: Date,
        start: Date,
        end: Date,
        project: number,
        status: number,
        miled: number,
        milestone: string,
        assignee: number,
        created_by: string,
        updated_by: string,
        created_at: string,
        updated_at: string,
        update_count: number
    ) {
        this.task_id = task_id;
        this.task_name = task_name;
        this.content = content;
        this.priority = priority;
        this.deadline = deadline;
        this.start = start;
        this.end = end;
        this.project = project;
        this.status = status;
        this.miled = miled;
        this.milestone = milestone;
        this.assignee = assignee;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.update_count = update_count;
    }
}

export interface CreateTask {
    task_name: string;
    content?: string;
    priority?: number;
    deadline?: Date;
    start?: Date;
    end?: Date;
    project?: number;
    status?: number;
    miled?: number;
    milestone?: string;
    assignee?: number;
    created_by: string;
    updated_by: string;
}
