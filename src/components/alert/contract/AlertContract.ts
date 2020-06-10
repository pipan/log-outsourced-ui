import { Identifiable } from '@wildebeest/repository/dist/identify/Identifiable';

export interface AlertContract extends Identifiable {
    getMessage(): string;
    getType(): string;
}
