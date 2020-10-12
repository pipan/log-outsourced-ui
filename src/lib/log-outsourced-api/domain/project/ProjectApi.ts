export interface ProjectApi {
    all (): Promise<any>;
    get (uuid: string): Promise<any>;
    create (project: any): Promise<any>;
    delete (project: any): Promise<Response>;
    update (prject: any): Promise<any>;
    generate (uuid: string): Promise<any>;
}
