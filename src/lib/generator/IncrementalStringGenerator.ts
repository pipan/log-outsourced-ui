import { Generatable } from './Generatable'
import { IncrementalGenerator } from './IncrementalGenerator'

export class IncrementalStringGenerator implements Generatable<string> {
    private generator: Generatable<number>

    public constructor () {
        this.generator = new IncrementalGenerator()
    }

    public generate (): string {
        return this.generator.generate() + ''
    }
}
