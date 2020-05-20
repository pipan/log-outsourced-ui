import { ListenerApi } from './ListnerApi'
import { ListenerEntity } from './ListenerEntity'
import { Adapter } from '@/lib/adapter'
import { ListenerReadAdapter } from './ListenerReadAdapter'

export class ListenerHttpApi implements ListenerApi {
    private host: string
    private readSchema: Adapter<any, ListenerEntity>

    public constructor (host: string) {
        this.host = host
        this.readSchema = new ListenerReadAdapter()
    }

    public create (listener: ListenerEntity): Promise<ListenerEntity> {
        return fetch(this.host + '/api/v1/listeners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                project_uuid: listener.getProjecUuid(),
                name: listener.getName(),
                rules: listener.getRules(),
                handler_slug: listener.getHandlerSlug(),
                handler_values: listener.getHandlerValues()
            })
        })
            .then(response => response.json())
            .then(data => this.readSchema.adapt(data))
    }

    public update (listener: ListenerEntity): Promise<ListenerEntity> {
        return fetch(this.host + '/api/v1/listeners/' + listener.getUuid(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                project_uuid: listener.getProjecUuid(),
                name: listener.getName()
            })
        })
            .then(response => response.json())
            .then(data => this.readSchema.adapt(data))
    }

    public delete (listener: ListenerEntity): Promise<ListenerEntity> {
        return fetch(this.host + '/api/v1/listeners/' + listener.getUuid(), {
            method: 'DELETE'
        })
            .then(response => response.json())
    }
}
