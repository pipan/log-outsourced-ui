import { ProjectApi } from './ProjectApi'
import { ProjectEntity } from './ProjectEntity'
import { ProjectReadAdapter } from './ProjectReadAdapter'
import { AdapterHelper, Adapter } from '@/lib/adapter'

export class ProjectHttpApi implements ProjectApi {
    private host: string
    private readAdapter: Adapter<any, ProjectEntity>

    public constructor (host: string) {
        this.host = host
        this.readAdapter = new ProjectReadAdapter()
    }

    public all (): Promise<Array<ProjectEntity>> {
        return fetch(this.host + '/api/v1/projects')
            .then(response => response.json())
            .then((data: any) => {
                const adapter: Adapter<Array<any>, Array<ProjectEntity>> = AdapterHelper.listOf(this.readAdapter)
                return adapter.adapt(data)
            })
    }

    public view (uuid: string): Promise<ProjectEntity> {
        return fetch(this.host + '/api/v1/projects/' + uuid)
            .then(response => response.json())
            .then(data => this.readAdapter.adapt(data))
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
}
