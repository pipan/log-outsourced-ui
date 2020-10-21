import { Alertable } from './Alertable'
import { Repository } from '@wildebeest/repository'
import { Generatable, IncrementalStringGenerator } from '@/lib/generator'

export class AutohideAlertable implements Alertable {
    private repo: Repository<any>
    private generator: Generatable<string> = new IncrementalStringGenerator()
    private delay: number

    private icons: {[key: string]: string} = {
        success: 'thumb_up_alt',
        warning: 'warning',
        error: 'error'
    }

    constructor (repo: Repository<any>, delay = 3000) {
        this.repo = repo
        this.delay = delay
    }

    public info (message: string): void {
        this.push('info', message)
    }

    public success (message: string): void {
        this.push('success', message)
    }

    public warning (message: string): void {
        this.push('warning', message)
    }

    public error (message: string): void {
        this.push('error', message)
    }

    public push (type: string, message: string): void {
        const alert: any = {
            id: this.generator.generate(),
            type: type,
            message: message
        }
        if (this.icons[type]) {
            alert.icon = this.icons[type]
        }
        this.repo.insert(alert)

        setTimeout(() => {
            this.repo.remove(alert)
        }, this.delay)
    }
}
