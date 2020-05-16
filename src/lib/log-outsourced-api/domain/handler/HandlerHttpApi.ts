import { HandlerApi } from './HandlerApi'
import { HandlerEntity } from './HandlerEntity'
import { Adapter, AdapterHelper } from '@/lib/adapter'
import { HandlerRreadAdapter } from './HandlerReadAdapter'

export class HandlerHttpApi implements HandlerApi {
    private readAdapter: Adapter<any, HandlerEntity>
    private host: string

    public constructor (host: string) {
        this.host = host
        this.readAdapter = new HandlerRreadAdapter()
    }

    public all (): Promise<Array<HandlerEntity>> {
        return fetch(this.host + '/api/v1/handlers')
            .then(response => response.json())
            .then((data: any) => {
                const adapter: Adapter<Array<any>, Array<HandlerEntity>> = AdapterHelper.listOf(this.readAdapter)
                return adapter.adapt(data)
            })
    }

    public view (slug: string): Promise<HandlerEntity> {
        return fetch(this.host + '/api/v1/handlers/' + slug)
            .then(response => response.json())
            .then(data => this.readAdapter.adapt(data))
    }
}
