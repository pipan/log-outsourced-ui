import { Controller } from '@/lib/framework'

export class SceneInitController implements Controller {
    public action (data: string): void {
        console.log(data)
    }
}
