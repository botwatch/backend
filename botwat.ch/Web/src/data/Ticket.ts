export interface Ticket {
    id: number;
    machineId: number;
    title: string;
    user: string;
    description: string;
    open: boolean;    
    started: Date,
    comments: Comment[] | null
}
