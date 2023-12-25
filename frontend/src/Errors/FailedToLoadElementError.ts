import { UIError } from "./UIError";

export class FailedToLoadElementError extends UIError {
    private errorMessage: string

    constructor(message = `Failed to load UI Element`) {
        super(message)

        this.errorMessage = `${message}. ${this.message}`
    }

    protected async logError(): Promise<void> {
        // TODO Send HTTP Request to Log Register Endpoint
        return new Promise((res, rej) => {})
    }

    getDefaultMessage(): string {
        return this.errorMessage
    }
}
