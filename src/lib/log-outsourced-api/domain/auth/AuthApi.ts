export interface AuthApi {
    access (data: any): Promise<any>;
    refresh (token: any): Promise<any>;
}
