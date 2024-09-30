
export interface DataEditService {
    create: (data: any) => Promise<void>;
    update: (id: number, data: any) => Promise<void>;
    delete: (id: number) => Promise<void>;
}
