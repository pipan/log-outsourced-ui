import { Controller, Module, SimpleModule, Store, Management } from '@/lib/framework'
import { CreateHttp, DeleteHttp, UpdateHttp } from '@/lib/log-outsourced-api/http'
import { CreateController } from './CreateController'
import { Repository, SimpleRepository } from '@wildebeest/repository'
import { Alertable } from './alert'
import { DeleteController } from './DeleteController'
import { UpdateController } from './UpdateController'

export class ModuleBuilder {
    private domain: string
    private repo: Repository<any>
    private actions: any[] = []

    public constructor (domain: string) {
        this.domain = domain
        this.repo = SimpleRepository.fromKeyProperty('uuid')
    }

    public withCreateAction (httpFactory: () => CreateHttp, alertable: Alertable): ModuleBuilder {
        return this.withAction('create', new CreateController(this.repo, httpFactory, alertable))
    }

    public withDeleteAction (httpFactory: () => DeleteHttp, alertable: Alertable): ModuleBuilder {
        return this.withAction('delete', new DeleteController(this.repo, httpFactory, alertable))
    }

    public withUpdateAction (httpFactory: () => UpdateHttp, alertable: Alertable): ModuleBuilder {
        return this.withAction('update', new UpdateController(this.repo, httpFactory, alertable))
    }

    public withAction (name: string, controller: Controller): ModuleBuilder {
        this.actions.push({
            action: this.domain + '@' + name,
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
