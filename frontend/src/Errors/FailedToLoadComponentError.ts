class FailedToLoadComponentError extends DomainError {
    constructor(message = `Failed To Load Component`) {
        super(message)
    }

    protected async logError(): Promise<void> {
        // TODO Fetch API endpoint to register Log on the backend
    }

    getDefaultMessage(): string {
        return `Failed to load Component. ${this.message}`
    }
}
