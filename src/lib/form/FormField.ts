export class FormField {
    private value: any
    private error: string

    public constructor (value: any, error = '') {
        this.value = value
        this.error = error
    }

    public get (): any {
        return this.value
    }

    public set (value: any): void {
        this.value = value
        this.setError('')
    }

    public hasError (): boolean {
        return this.error.length > 0
    }

    public getError (): string {
        return this.error
    }

    public setError (error: string): void {
        this.error = error
    }
}
