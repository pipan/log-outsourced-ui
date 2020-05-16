import { HandlerEntity } from './HandlerEntity'

export interface HandlerApi {
    all (): Promise<Array<HandlerEntity>>;
    view (slug: string): Promise<HandlerEntity>;
}
