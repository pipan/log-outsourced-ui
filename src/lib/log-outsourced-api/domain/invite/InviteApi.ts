export interface InviteApi {
    load (token: string): Promise<any>;
    accept (data: any): Promise<any>;
}
