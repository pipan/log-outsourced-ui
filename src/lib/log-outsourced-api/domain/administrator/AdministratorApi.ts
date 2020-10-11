export interface AdministratorApi {
    all (): Promise<any>;
    invite (admin: any): Promise<any>;
    delete (admin: any): Promise<Response>;
}
