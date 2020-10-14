import { ModularFramework, Store, Kernel } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication, Bootstrap } from './app'
import { ProjectModule } from './module/project'
import { OutsourcedProxyApi } from './lib/log-outsourced-api'
import { ConnectionModule } from './module/connection'
import { AdministratorModule } from './module/administrator'
import { AuthModule } from './module/auth'
import { UserModule } from './module/user'
import { RoleModule } from './module/role'
import { Storage } from './lib/storage'
import { Management } from './lib/framework/Management'
import { Channel, ProxyChannel } from '@wildebeest/observable'

// const validatorBuilder: ExtendableValidatorBuilder = new ExtendableValidatorBuilder()
// validatorBuilder.extend(new BasicValidatorRuleProvide())
// validatorBuilder.extend(new StringRuleProvider())

// const framework: ModularFramework = new ModularFramework([
//     new AlertModule(),
//     new AuthModule(api),
//     new ConnectionModule(api),
//     new AdministratorModule(api),
//     new ProjectModule(api),
//     new UserModule(api),
//     new RoleModule(api)
    // new HandlerModule(httpApi.handlers()),
    // new ListenerModule(httpApi.listeners(), httpApi.log())
// ])

const kernel = new Kernel()
kernel.boot(Bootstrap.getModules())

const vue = new VueApplication(kernel.getStore())
vue.connectFn((event: any) => {
    kernel.process(event.event, event.data)
})
vue.start()
