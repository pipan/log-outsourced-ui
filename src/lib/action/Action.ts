export interface Action<T> {
    activate (data: T): T;
}
