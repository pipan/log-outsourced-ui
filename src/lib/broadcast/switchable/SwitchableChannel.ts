import { Channel } from '../Channel'

export class SwitchableChannel extends Channel {
    protected isOn: boolean

    public constructor (isOn: boolean) {
        super()
        this.isOn = isOn
    }

    public dispatch (data: any): void {
        if (!this.isOn) {
            return
        }
        super.dispatch(data)
    }

    public start (): void {
        this.isOn = true
    }

    public stop (): void {
        this.isOn = false
    }
}
