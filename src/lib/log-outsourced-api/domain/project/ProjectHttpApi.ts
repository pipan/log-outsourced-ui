import { ProjectApi } from './ProjectApi'
import { ProjectEntity } from './ProjectEntity'
import { ProjectReadAdapter } from './ProjectReadAdapter'
import { AdapterHelper, Adapter } from '@/lib/adapter'
import { ListenerEntity } from '../listener/ListenerEntity'
import { ListenerReadAdapter } from '../listener/ListenerReadAdapter'

export class ProjectHttpApi implements ProjectApi {
    private host: string
    private readAdapter: Adapter<any, ProjectEntity>
    private listenerReadAdapter: Adapter<any, ListenerEntity>

    public constructor (host: string) {
        this.host = host
        this.readAdapter = new ProjectReadAdapter()
        this.listenerReadAdapter = new ListenerReadAdapter()
    }

    public all (): Promise<Array<ProjectEntity>> {
        return fetch(this.host + '/api/v1/projects')
            .then(response => response.json())
            .then((data: any) => {
                const adapter: Adapter<Array<any>, Array<ProjectEntity>> = AdapterHelper.listOf(this.readAdapter)
                return adapter.adapt(data)
            })
    }

    public view (uuid: string): Promise<{project: ProjectEntity; listeners: Array<ListenerEntity>}> {
        return fetch(this.host + '/api/v1/projects/' + uuid)
            .then(response => response.json())
            .then((data: any) => {
                const listAdapter: Adapter<Array<any>, Array<ListenerEntity>> = AdapterHelper.listOf(this.listenerReadAdapter)
                return {
                    project: this.readAdapter.adapt(data.project),
                    listeners: listAdapter.adapt(data.listeners)
                }
            })
    }

    public delete (project: ProjectEntity): Promise<void> {
        return fetch(this.host + '/api/v1/projects/' + project.getUuid(), {
            method: 'DELETE'
        })
            .then(response => response.json())
    }

    public create (project: ProjectEntity): Promise<ProjectEntity> {
        return fetch(this.host + '/api/v1/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: project.getName()
            })
        })
            .then(response => response.json())
            .then(data => this.readAdapter.adapt(data))
    }

    public update (project: ProjectEntity): Promise<ProjectEntity> {
        return fetch(this.host + '/api/v1/projects/' + project.getUuid(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: project.getName()
            })
        })
            .then(response => response.json())
            .then(data => this.readAdapter.adapt(data))
    }

    public generate (uuid: string): Promise<ProjectEntity> {
        return fetch(this.host + '/api/v1/projects/' + uuid + '/generate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.readAdapter.adapt(data))
    }
}
