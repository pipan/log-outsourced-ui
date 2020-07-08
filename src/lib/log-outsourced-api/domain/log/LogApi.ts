export interface LogApi {
    single (project: string, log: any): Promise<Response>;
    batch (project: string, data: Array<any>): Promise<Response>;
}
