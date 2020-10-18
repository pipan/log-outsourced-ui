import { LoadHttp } from '../../http/LoadHttp'

export interface HandlerApi extends LoadHttp {
    view (slug: string): Promise<any>;
}
