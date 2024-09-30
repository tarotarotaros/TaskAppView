import { CreatePriority, Priority } from "../../../types/Priority";

export interface PriorityService {
    createPriority: (data: CreatePriority) => Promise<void>;
    updatePriority: (id: number, data: Priority) => Promise<void>;
    deletePriority: (priorityId: number) => Promise<void>;
}
