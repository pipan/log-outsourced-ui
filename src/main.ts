import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { ProjectModule } from './module/project'
import { LogOutsourcedApi, LogOutsourcedHttpApi } from './lib/log-outsourced-api'
import { HandlerModule } from './module/handler'
import { ApiModule } from './module/api'
import { ListenerModule } from './module/listener'
import { ExtendableValidatorBuilder, Validator } from './lib/validator'
import { BasicValidatorRuleProvide } from './lib/validator/basic/BasicValidatorRuleProvider'
import { StringRuleProvider } from './lib/validator/string/StringRuleProvider'

const host: string = process.env.VUE_APP_LOG_OUTSOURCED_API_HOST
const httpApi: LogOutsourcedApi = new LogOutsourcedHttpApi(host)
const validatorBuilder: ExtendableValidatorBuilder = new ExtendableValidatorBuilder()
validatorBuilder.extend(new BasicValidatorRuleProvide())
validatorBuilder.extend(new StringRuleProvider())

const framework: ModularFramework = new ModularFramework([
    new AlertModule(),
    new ProjectModule(httpApi.projects(), validatorBuilder),
    new HandlerModule(httpApi.handlers()),
    new ListenerModule(httpApi.listeners()),
    new ApiModule(host)
])

const vue = new VueApplication(framework)
