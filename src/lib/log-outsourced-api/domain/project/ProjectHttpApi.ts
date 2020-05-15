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
}
