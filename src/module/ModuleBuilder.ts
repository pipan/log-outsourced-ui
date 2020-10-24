import { Controller, Module, SimpleModule, Store, Management } from '@/lib/framework'
import { CreateHttp, DeleteHttp, UpdateHttp, AllForProjectHttp } from '@/lib/log-outsourced-api/http'
import { CreateController } from './CreateController'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { Alertable } from './alert'
import { DeleteController } from './DeleteController'
import { UpdateController } from './UpdateController'
import { LoadHttp } from '@/lib/log-outsourced-api/http/LoadHttp'
import { LoadController } from './LoadController'
import { LoadForProjectController } from './LoadForProjectController'
import { ClearController } from './ClearController'
import { ServerValidator } from './form'

export class ModuleBuilder {
    private domain: string
    private repo: Repository<any>
    private actions: any[] = []

    public constructor (domain: string) {
        this.domain = domain
        this.repo = SimpleRepository.fromKeyProperty('uuid')
    }

    public withRepository (repo: Repository<any>): ModuleBuilder {
        this.repo = repo
        return this
    }

    public withCreateAction (httpFactory: () => CreateHttp, alertable: Alertable, serverValidator: ServerValidator): ModuleBuilder {
        return this.withDomainAction('create', new CreateController(this.repo, httpFactory, alertable, serverValidator))
    }

    public withDeleteAction (httpFactory: () => DeleteHttp, alertable: Alertable): ModuleBuilder {
        return this.withDomainAction('delete', new DeleteController(this.repo, httpFactory, alertable))
    }

    public withUpdateAction (httpFactory: () => UpdateHttp, alertable: Alertable, serverValidator: ServerValidator): ModuleBuilder {
        return this.withDomainAction('update', new UpdateController(this.repo, httpFactory, alertable, serverValidator))
    }

    public withLoadAction (httpFactory: () => LoadHttp): ModuleBuilder {
        return this.withDomainAction('load', new LoadController(this.repo, httpFactory))
    }

    public withLoadForProjectAction (httpFactory: () => AllForProjectHttp): ModuleBuilder {
        return this.withDomainAction('load', new LoadForProjectController(this.repo, httpFactory))
    }

    public withClearOnProjectOpen (): ModuleBuilder {
        return this.withAction('project@open', new ClearController(this.repo))
    }

    public withDomainAction (name: string, controller: Controller): ModuleBuilder {
        return this.withAction(this.domain + '@' + name, controller)
    }

    public withAction (name: string, controller: Controller): ModuleBuilder {
        this.actions.push({
            action: name,
            controller: controller
        })
        return this
    }

    public build (): Module {
        const store = (new Store())
            .withItem(this.domain + 's', this.repo)
        let management = new Management()
        for (const action of this.actions) {
            management = management.withAction(action.action, action.controller)
        }

        return new SimpleModule(store, management)
    }
}
