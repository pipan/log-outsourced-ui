import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { ProjectModule } from './module/project'
import { OutsourcedApi } from './lib/log-outsourced-api'
import { ConnectionModule } from './module/connection'
import { AdministratorModule } from './module/administrator'
import { AuthModule } from './module/auth'
import { EagerObservable } from '@wildebeest/observable'
import { UserModule } from './module/user'

// const validatorBuilder: ExtendableValidatorBuilder = new ExtendableValidatorBuilder()
// validatorBuilder.extend(new BasicValidatorRuleProvide())
// validatorBuilder.extend(new StringRuleProvider())

const api = new EagerObservable<OutsourcedApi>()

const framework: ModularFramework = new ModularFramework([
    new AlertModule(),
    new AuthModule(api),
    new ConnectionModule(api),
    new AdministratorModule(api),
    new ProjectModule(api),
    new UserModule(api)
    // new HandlerModule(httpApi.handlers()),
    // new ListenerModule(httpApi.listeners(), httpApi.log())
])

const vue = new VueApplication(framework)
