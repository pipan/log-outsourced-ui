import { Controller, PropertyEntity } from '@/lib/framework'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { ValidatorBuilder, Validator } from '@/lib/validator'
import { Validation } from '@/lib/validator/Validation'
import { AlertHelper } from '@/module/alert'
import { Repository } from '@wildebeest/repository'
import { Channel } from '@wildebeest/observable'

export class ProjectCreateController implements Controller {
    private validator: Validator
    private projects: Repository<ProjectEntity>
    private propertyMap: Map<string, PropertyEntity>
    private channel: Channel<any>
    private projectApi: ProjectApi

    public constructor (
        projects: Repository<ProjectEntity>,
        properties: Repository<any>,
        projectApi: ProjectApi,
        channel: Channel<any>,
        validatorBuilder: ValidatorBuilder
    ) {
        this.projects = projects
        this.channel = channel
        this.projectApi = projectApi
        this.propertyMap = new Map()

        this.validator = validatorBuilder.build({
            name: ['required', 'str.max:255']
        })

        properties.query().map<string>()
            .connectFn((map: Map<string, PropertyEntity>) => {
                this.propertyMap = map
            })
    }

    public action (data?: any): void {
        const model = this.propertyMap.get('project.create')?.get()
        const validation: Validation = this.validator.validate(data)
        if (!validation.isValid()) {
            validation.getErrors().forEach((error: string, field: string) => {
                model.error[field] = error
            })
            return
        }

        this.projectApi.create(new ProjectEntity('', data.body.name))
            .then((project: ProjectEntity) => {
                this.projects.insert(project)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Project has been created')
                )
                this.channel.dispatch({ event: 'project.create@reset' })
                if (data.success) {
                    data.success(project)
                }
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent(error)
                )
            })
    }
}
