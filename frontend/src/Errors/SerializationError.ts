class SerializationError extends DomainError {
    constructor(message: string = 'Failed to serialize given data') {
        super(message)
    }

    protected async logError(): Promise<void> {
        // TODO API Log Endpoiunt    
    }

    getDefaultMessage(): string {
        return `Failed to serialize given data. ${this.message}`
    }
}
