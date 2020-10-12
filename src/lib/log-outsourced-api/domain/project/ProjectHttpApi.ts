import { ProjectApi } from './ProjectApi'
import { ProjectEntity } from './ProjectEntity'
import { ProjectReadAdapter } from './ProjectReadAdapter'
import { Adapter } from '@/lib/adapter'
import { SuccessfulStatusFilter } from '../../http/SuccessfulStatusFilter'
import { HttpFetch } from '../../http/HttpFetch'
import { AuthHttp } from '../auth/AuthHttp'

export class ProjectHttpApi implements ProjectApi {
    private host: string
    private readAdapter: Adapter<any, ProjectEntity>
    private filter: SuccessfulStatusFilter
    private authHttp: AuthHttp

    public constructor (host: string, authHttp: AuthHttp) {
        this.host = host
        this.authHttp = authHttp
        this.readAdapter = new ProjectReadAdapter()
        this.filter = new SuccessfulStatusFilter()
    }

    public all (): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects')
            .withJson()
            .withMethod('GET')

        return this.authHttp.send(http)
    }

    public get (uuid: string): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + uuid)
            .withJson()
            .withMethod('GET')

        return this.authHttp.send(http)
    }

    public delete (project: any): Promise<Response> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + project.uuid)
            .withJson()
            .withMethod('DELETE')

        return this.authHttp.send(http)
    }

    public create (project: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects')
            .withJson(project)
            .withMethod('POST')

        return this.authHttp.send(http)
    }

    public update (project: any): Promise<any> {
        const http = HttpFetch.fromUrl(this.host + '/api/v1/projects/' + project.uuid)
            .withJson({
                name: project.name
            })
            .withMethod('PUT')

        return this.authHttp.send(http)
    }

    public generate (uuid: string): Promise<any> {
        return fetch(this.host + '/api/v1/projects/' + uuid + '/generate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.filter.filter.bind(this.filter))
            .then(data => this.readAdapter.adapt(data))
    }
}
