export interface IDashboard {
    graph: IGraph[];
    totalExp: number;
    totalActions: number;
}

export interface IGraph {
    date: number;
    dateString: string;
    count: number;
}
