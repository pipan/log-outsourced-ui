export class ImmutableForm {
    public readonly fields: any
    public readonly errors: any

    public constructor (fields: any, errors: any) {
        this.fields = fields
        this.errors = errors
    }

    public setError (key: string, error: string): ImmutableForm {
        const newErrors: any = this.errors
        newErrors[key] = error
        return new ImmutableForm(this.fields, newErrors)
    }
}