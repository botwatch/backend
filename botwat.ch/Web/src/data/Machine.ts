export interface Machine {
    basePath: string;
    company: string;
    location: string;
    machineNumber: number;
    name: string;
    firstChange: string;
    latestChange: string;
    users?: (null)[] | null;
    fullPath: string;
    softwareVersion: number;
}
