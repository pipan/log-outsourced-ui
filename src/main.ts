import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { SceneModule } from './module/scene'
import { ProjectModule } from './module/project'
import { LogOutsourcedApi, LogOutsourcedHttpApi } from './lib/log-outsourced-api'
import { HandlerModule } from './module/handler'
import { ApiModule } from './module/api'
import { ListenerModule } from './module/listener'

const host: string = process.env.VUE_APP_LOG_OUTSOURCED_API_HOST
const httpApi: LogOutsourcedApi = new LogOutsourcedHttpApi(host)

const framework: ModularFramework = new ModularFramework([
    new SceneModule(),
    new AlertModule(),
    new ProjectModule(httpApi.projects()),
    new HandlerModule(httpApi.handlers()),
    new ListenerModule(httpApi.listeners()),
    new ApiModule(host)
])

const vue = new VueApplication(framework)
