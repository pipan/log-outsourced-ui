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
    private properties: Repository<PropertyEntity>
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
        this.properties = properties

        this.validator = validatorBuilder.build({
            name: ['required', 'str.max:255']
        })
    }

    public action (data?: any): void {
        // const validation: Validation = this.validator.validate(data)
        // if (!validation.isValid()) {
        //     validation.getErrors().forEach((error: string, field: string) => {
        //         this.projectCreate.get()[field].setError(error)
        //     })
        //     return
        // }

        this.projectApi.create(new ProjectEntity('', data.name))
            .then((project: ProjectEntity) => {
                this.projects.insert(project)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Project has been created')
                )
                this.channel.dispatch({
                    event: 'project@open',
                    data: project
                })
                this.channel.dispatch({ event: 'project.create@reset' })
            })
            .catch((error: any) => {
                console.error(error)
                this.channel.dispatch(
                    AlertHelper.errorEvent('Cannot save project')
                )
            })
    }
}
