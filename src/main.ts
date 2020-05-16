import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { SceneModule } from './module/scene'
import { ProjectModule } from './module/project'
import { LogOutsourcedApi, LogOutsourcedHttpApi } from './lib/log-outsourced-api'
import { HandlerModule } from './module/handler'

const httpApi: LogOutsourcedApi = new LogOutsourcedHttpApi(
    process.env.VUE_APP_LOG_OUTSOURCED_API_HOST
)

const framework: ModularFramework = new ModularFramework([
    new SceneModule(),
    new AlertModule(),
    new ProjectModule(httpApi.projects()),
    new HandlerModule(httpApi.handlers())
])

const vue = new VueApplication(framework)
