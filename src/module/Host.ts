export class Host {
    public static fromConnectionHost (host: string): string {
        if (host.startsWith('http')) {
            return host
        }
        return 'https://' + host
    }

    public static fromConnection (connection: any): string {
        return Host.fromConnectionHost(connection.host)
    }
}
