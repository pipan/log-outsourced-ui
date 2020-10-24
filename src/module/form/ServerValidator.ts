import { Repository } from '@wildebeest/repository'

export class ServerValidator {
    private repo: Repository<any>

    constructor (repo: Repository<any>) {
        this.repo = repo
    }

    public validate (id: string, response: any) {
        if (response.ok) {
            return
        }
        if (response.status !== 422) {
            return
        }

        const form: any = {
            id: id,
            error: {}
        }
        for (const key in response.body.errors) {
            form.error[key] = response.body.errors[key][0]
        }
        this.repo.insert(form)
    }
}
