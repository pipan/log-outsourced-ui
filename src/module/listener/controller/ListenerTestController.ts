import { Controller } from '@/lib/framework'
import { Channel } from '@wildebeest/observable'
import { LogApi } from '@/lib/log-outsourced-api/domain/log/LogApi'

export class ListenerTestController implements Controller {
    private logApi: LogApi
    private channel: Channel<any>

    public constructor (logApi: LogApi, channel: Channel<any>) {
        this.logApi = logApi
        this.channel = channel
    }

    public action (event: {project: string; rules: Array<string>}): void {
        if (event.rules.length === 0) {
            return
        }

        let resultPromise: Promise<Response>
        if (event.rules.length > 1) {
            const data: Array<any> = []
            for (const rule of event.rules) {
                data.push({
                    level: rule,
                    message: 'This is a test message',
                    context: {
                        test: true
                    }
                })
            }
            resultPromise = this.logApi.batch(event.project, data)
        } else {
            resultPromise = this.logApi.single(event.project, {
                level: event.rules[0],
                message: 'This is a test message',
                context: {
                    test: true
                }
            })
        }

        // resultPromise.then(() => {
        //         this.channel.dispatch(
        //             AlertHelper.infoEvent('Test has been send')
        //         )
        //     })
        //     .catch((error: any) => {
        //         console.error(error)
        //         this.channel.dispatch(
        //             AlertHelper.errorEvent('Something is wrong, cannot test rule')
        //         )
        //     })
    }
}
