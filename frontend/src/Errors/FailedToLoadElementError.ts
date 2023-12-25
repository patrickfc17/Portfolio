import { UIError } from "./UIError";

export class FailedToLoadElementError extends UIError {

    constructor(message = `Failed to load UI Element`) {
        super(message)
    }

    protected async logError(): Promise<void> {
        // TODO Send HTTP Request to Log Register Endpoint
        return new Promise((res, rej) => {
            res(console.log(this.message))
        })
    }
}
