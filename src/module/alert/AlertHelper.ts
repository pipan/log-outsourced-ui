export class AlertHelper {
    public static errorEvent (message: string): any {
        return AlertHelper.event('error', message)
    }

    public static infoEvent (message: string): any {
        return AlertHelper.event('info', message)
    }

    public static successEvent (message: string): any {
        return AlertHelper.event('success', message)
    }

    public static event (type: string, message: string): any {
        return {
            event: 'alert@create',
            data: {
                message: message,
                type: type
            }
        }
    }
}
