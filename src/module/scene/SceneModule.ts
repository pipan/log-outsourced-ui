import { Module } from '@/lib/framework'
import { SceneChangeController } from './controller/SceneChangeController'
import { SimpleObservableProperty, MapEntry, ObservableProperty } from '@wildebeest/observe-changes'
import { Context } from '@/lib/framework/module/Context'
import { SceneInitController } from './controller/SceneInitController'

export class SceneModule implements Module {
    public install (context: Context): void {
        const scene: ObservableProperty<string> = new SimpleObservableProperty()

        context.observables().add('scene', scene)

        context.controllers().addList([
            new MapEntry('scene@change', new SceneChangeController(scene)),
            new MapEntry('scene@init', new SceneInitController())
        ])
    }
}
