import { Kernel } from './lib/framework'
import { VueApplication, Bootstrap } from './app'
import './registerServiceWorker'

const kernel = new Kernel()
kernel.boot(Bootstrap.getModules())

const vue = new VueApplication(kernel.getStore())
vue.connectFn((event: any) => {
    kernel.process(event.event, event.data)
})
vue.start()
