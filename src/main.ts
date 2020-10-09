import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { ProjectModule } from './module/project'
import { OutsourcedApi, LogOutsourcedHttpApi, ConfigApi, ConfigHttpApi } from './lib/log-outsourced-api'
import { HandlerModule } from './module/handler'
import { ApiModule } from './module/api'
import { ListenerModule } from './module/listener'
import { ExtendableValidatorBuilder } from './lib/validator'
import { BasicValidatorRuleProvide } from './lib/validator/basic/BasicValidatorRuleProvider'
import { StringRuleProvider } from './lib/validator/string/StringRuleProvider'
import { ConnectionModule } from './module/connection'
import { AdministratorModule } from './module/administrator'
import { AuthModule } from './module/auth'
import { EagerObservable } from '@wildebeest/observable'

const validatorBuilder: ExtendableValidatorBuilder = new ExtendableValidatorBuilder()
validatorBuilder.extend(new BasicValidatorRuleProvide())
validatorBuilder.extend(new StringRuleProvider())

const api = new EagerObservable<OutsourcedApi>()

const framework: ModularFramework = new ModularFramework([
    new AlertModule(),
    new AuthModule(api),
    new ConnectionModule(api),
    new AdministratorModule(),
    new ProjectModule(api, validatorBuilder)
    // new HandlerModule(httpApi.handlers()),
    // new ListenerModule(httpApi.listeners(), httpApi.log())
])

const vue = new VueApplication(framework)
