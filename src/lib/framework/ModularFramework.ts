import { Broadcaster, SimpleBroadcaster } from '../broadcast'
import { Module } from './module/Module'
import { Framework } from './Framework'
import { ControllerListener } from './controller/ControllerListener'
import { Controller } from './controller/Controller'
import { Context } from './module/Context'
import { SimpleContext } from './module/SimpleContext'
import { OutsideEventListener } from './listener/OutsideEventListener'
import { Channel } from '@wildebeest/observable'
import { MapChange, SimpleRepository, Repository } from '@wildebeest/repository'
import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable'

export class ModularFramework implements Framework {
    private broadcast: Broadcaster<any> = new SimpleBroadcaster()
    private context: Context = new SimpleContext()

    public constructor (modules: Array<Module> = []) {
        this.context.controllers().connectFn(
            this.onControllersChange.bind(this)
        )
        this.context.channel().connect(
            new OutsideEventListener(this)
        )

        this.context.repositories().insert('properties', SimpleRepository.createIdentifiable())

        for (const module of modules) {
            this.installModule(module)
        }
    }

    private onControllersChange (change: MapChange<string, Controller>): void {
        for (const entity of change.inserted()) {
            // TODO: check if channel has listener then print error / warning
            this.broadcast.getChannel(entity.getKey())
                .connect(new ControllerListener(entity.getValue()))
        }
    }

    public installModule (module: Module): void {
        module.install(this.context)
    }

    public process (event: string, data?: any): void {
        this.broadcast.getChannel(event)
            .dispatch(data)
    }

    public getObservable (name: string): any {
        return this.context.observables().get(name)
    }

    public getChannel (): Channel<any> {
        return this.context.channel()
    }

    public getRepository<T extends Identifiable> (name: string): Repository<T> {
        return this.context.repositories().get(name)!
    }
}
