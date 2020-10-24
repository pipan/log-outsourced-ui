import { Repository } from '@wildebeest/repository'

export class FormValidator {
    private repo: Repository<any>

    constructor (repo: Repository<any>) {
        this.repo = repo
    }

    public validateHttpResponse (id: string, response: any) {
        if (response.ok) {
            return
        }
        if (response.status !== 422) {
            return
        }

        const errors: { [key: string]: string } = {}
        for (const key in response.body.errors) {
            errors[key] = response.body.errors[key][0]
        }
        this.setError(id, errors)
    }

    public setError (id: string, errors: { [key: string]: string }) {
        this.repo.insert({
            id: id,
            error: errors
        })
    }
}
