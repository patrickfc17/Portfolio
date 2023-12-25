import { UIError } from "./UIError";

export class RequiredAttributeError extends UIError {
    private errorMessage: string

    constructor(message = 'This Component requires an attribute that was not informed') {
        super(message)

        this.errorMessage = `${message}. ${this.message}`
    }

    protected logError(): Promise<void> {
        // TODO Add Log Fetch to the Backend Endpoint
        return new Promise((res, rej) => {})
    }
}
