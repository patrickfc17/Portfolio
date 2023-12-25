abstract class DomainError extends Error {
    constructor(message: string) {
        super(message)

        this.logError()
    }

    protected abstract logError(): Promise<void>

    abstract getDefaultMessage(): string
}
