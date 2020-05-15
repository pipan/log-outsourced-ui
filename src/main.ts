import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { SceneModule } from './module/scene'
import { ProjectModule } from './module/project'
import { ProjectApi } from './lib/log-outsourced-api'
import { ProjectHttpApi } from './lib/log-outsourced-api/domain/project/ProjectHttpApi'

const projectApi: ProjectApi = new ProjectHttpApi(
    process.env.VUE_APP_LOG_OUTSOURCED_API_HOST
)

const framework: ModularFramework = new ModularFramework([
    new SceneModule(),
    new AlertModule(),
    new ProjectModule(projectApi)
])

const vue = new VueApplication(framework)
