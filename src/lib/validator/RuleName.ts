export class RuleName {
    private name: string
    private args: Array<string>

    public constructor (name: string, args: Array<string> = []) {
        this.name = name
        this.args = args
    }

    public getName (): any {
        return this.name
    }

    public getArgs (): Array<string> {
        return this.args
    }
}
