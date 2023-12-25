export abstract class UIError extends Error {
    constructor(message: string) {
        super(message)

        this.logError()
    }

    protected abstract logError(): Promise<void>
}
