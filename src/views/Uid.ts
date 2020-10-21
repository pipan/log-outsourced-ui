export class Uid {
    private static id = 1

    public static next (): number {
        return Uid.id++
    }
}
