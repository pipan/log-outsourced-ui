import { Controller } from '@/lib/framework'
import { ObservableProperty } from '@wildebeest/observe-changes'

export class SceneChangeController implements Controller {
    private scene: ObservableProperty<string>

    public constructor (scene: ObservableProperty<string>) {
        this.scene = scene
    }

    public action (data?: any): void {
        this.scene.set(data)
    }
}
