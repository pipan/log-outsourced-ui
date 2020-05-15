import { Controller } from '@/lib/framework'

export class ProjectOpenController implements Controller {
    public action (data?: any): void {
        console.log('project open controller')
    }
}
