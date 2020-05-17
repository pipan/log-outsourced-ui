import { Broadcast, SimpleBroadcast } from '../broadcast'
import { Module } from './module/Module'
import { Framework } from './Framework'
import { ControllerListener } from './controller/ControllerListener'
import { Controller } from './controller/Controller'
import { Context } from './module/Context'
import { SimpleContext } from './module/SimpleContext'
import { MapChange } from '@wildebeest/observe-changes'
import { Channel } from '../broadcast/Channel'
import { OutsideEventListener } from './listener/OutsideEventListener'

export class ModularFramework implements Framework {
    private broadcast: Broadcast = new SimpleBroadcast()
    private context: Context = new SimpleContext()

    public constructor (modules: Array<Module> = []) {
        this.context.controllers().addListener(
            this.onControllersChange.bind(this)
        )
        this.context.channel().addListener(
            new OutsideEventListener(this)
        )

        for (const module of modules) {
            this.installModule(module)
        }
    }

    private onControllersChange (change: MapChange<string, Controller>): void {
        for (const entity of change.inserted()) {
            // TODO: check if channel has listener then print error / warning
            this.broadcast.channel(entity.getKey())
                .addListener(new ControllerListener(entity.getValue()))
        }
    }

    public installModule (module: Module): void {
        module.install(this.context)
    }

    public process (event: string, data?: any): void {
        this.broadcast.channel(event)
            .dispatch(data)
    }

    public getObservable (name: string): any {
        return this.context.observables().get(name)
    }

    public getChannel (): Channel {
        return this.context.channel()
    }
}
