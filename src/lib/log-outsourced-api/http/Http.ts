export interface Http {
    get(): Promise<any>;
    post (): Promise<any>;
    put (): Promise<any>;
    delete (): Promise<any>;
    send (): Promise<any>;
    withJson (body?: any): Http;
    withBody (body?: any): Http;
    withHeader (name: string, value: string): Http;
    withBearer (token: string): Http;
    withMethod (method: string): Http;
}
