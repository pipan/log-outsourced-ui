import { Generatable } from './Generatable'

export class IncrementalGenerator implements Generatable<number> {
    private next = 1

    public generate (): number {
        const value: number = this.next
        this.next += 1
        return value
    }
}
