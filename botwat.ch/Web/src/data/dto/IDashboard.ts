export interface IDashboard {
    graph: IGraph[];
    totalExp: number;
    totalActions: number;
    totalTime: number;
}

export interface IGraph {
    date: number;
    dateString: string;
    count: number;
    previousCount:number;
}
