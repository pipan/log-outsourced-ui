import { Controller } from './controller/Controller'
import { FnController } from './controller/FnController'
import { ControllerProvider } from './ControllerProvider'

export class Management implements ControllerProvider {
    private actions: {[key: string]: Controller[]}

    constructor (actions: {[key: string]: Controller[]} = {}) {
        this.actions = actions
    }

    public getActions (): {[key: string]: Controller[]} {
        return this.actions
    }

    public withActions (key: string, actions: Controller[]): Management {
        let result = new Management(this.actions)
        for (const action of actions) {
            result = result.withAction(key, action)
        }
        return result
    }

    public withAction (key: string, action: Controller): Management {
        const clone = Object.assign({}, this.actions)
        if (!clone[key]) {
            clone[key] = []
        }
        clone[key].push(action)
        return new Management(clone)
    }

    public withActionFn (key: string, fn: (data?: any) => void): Management {
        return this.withAction(key, new FnController(fn))
    }

    public withProvider (provider: ControllerProvider): Management {
        let result = new Management(this.actions)
        const actions = provider.getActions()
        for (const key in actions) {
            result = result.withActions(key, actions[key])
        }
        return result
    }
}
