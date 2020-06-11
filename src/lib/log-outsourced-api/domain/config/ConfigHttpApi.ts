import { ConfigApi } from './ConfigApi'

export class ConfigHttpApi implements ConfigApi {
    public load (): Promise<any> {
        return fetch('/config.json')
            .then(response => response.json())
    }
}
