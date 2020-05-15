import { ModularFramework } from './lib/framework'
import { AlertModule } from './module/alert'
import { VueApplication } from './app'
import { SceneModule } from './module/scene'
import { ProjectModule } from './module/project'

const framework: ModularFramework = new ModularFramework([
    new SceneModule(),
    new AlertModule(),
    new ProjectModule()
])

const vue = new VueApplication(framework)
