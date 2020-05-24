import { Controller } from '@/lib/framework'
import { ObservableList, ObservableProperty } from '@wildebeest/observe-changes'
import { ProjectEntity, ProjectApi } from '@/lib/log-outsourced-api'
import { Channel } from '@/lib/broadcast/Channel'
import { ValidatorBuilder, Validator } from '@/lib/validator'
import { Validation } from '@/lib/validator/Validation'
import { AlertHelper } from '@/module/alert'

export class ProjectCreateController implements Controller {
    private validator: Validator
    private projects: ObservableList<ProjectEntity>
    private projectCreate: ObservableProperty<any>
    private channel: Channel
    private projectApi: ProjectApi

    public constructor (
        validatorBuilder: ValidatorBuilder,
        projects: ObservableList<ProjectEntity>,
        channel: Channel,
        projectApi: ProjectApi,
        projectCreate: ObservableProperty<any>
    ) {
        this.projects = projects
        this.channel = channel
        this.projectApi = projectApi
        this.projectCreate = projectCreate

        this.validator = validatorBuilder.build({
            name: ['required', 'str.max:255']
        })
    }

    public action (data?: any): void {
        const validation: Validation = this.validator.validate(data)
        if (!validation.isValid()) {
            validation.getErrors().forEach((error: string, field: string) => {
                this.projectCreate.get()[field].setError(error)
            })
            return
        }

        this.projectApi.create(new ProjectEntity('', data.name))
            .then((project: ProjectEntity) => {
                this.projects.add(project)
                this.channel.dispatch(
                    AlertHelper.infoEvent('Project has been created')
                )
                this.channel.dispatch({
                    event: 'scene@change',
                    data: '/'
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
