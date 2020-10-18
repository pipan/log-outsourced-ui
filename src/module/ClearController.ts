import { Controller } from '@/lib/framework'
import { Repository } from '@wildebeest/repository'

export class ClearController implements Controller {
    private repo: Repository<any>

    public constructor (repo: Repository<any>) {
        this.repo = repo
    }

    public action (data?: any): void {
        this.repo.clear()
    }
}
