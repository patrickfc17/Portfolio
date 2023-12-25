import { FailedToLoadComponentError } from '../Errors/FailedToLoadComponentError'
import { SerializationError } from '../Errors/SerializationError'

type PromiseResult = [PromiseSettledResult<Response>, PromiseSettledResult<any>]
type ResultValuesArray = [Response, Promise<ScriptResponse>]
interface ScriptResponse extends Response {
    default: {
        load: () => void
    }
}

// TODO Type some kind of regexp path to this parameters
export const useImportedComponent = (
    path: string,
    root = 'index'
): void => {
    Promise.allSettled([
        fetch(`../../${path}/${root}.html`),
        import(`../../${path}/${import.meta.env.VITE_PUBLIC_COMPONENT_DEFINITION_PREFIX}`)
    ]).then(async (results) => {        
        const values = checkPromisesResolution(results)        

        try {
            const template = await parseTemplateContent(values[0])
            const componentScript = await values[1]

            renderTemplate(template as string, componentScript)
        } catch (e: unknown) {
            if (e instanceof FailedToLoadComponentError) {
                console.log(e.getDefaultMessage())
                // TODO Fetch API endpoint to redirect to 500 Error Page
            }
        }
    })
}

const checkPromisesResolution = (results: PromiseResult): ResultValuesArray => {
    let values: Promise<Response>[] = []
    results.forEach((result) => {
        if (result.status === 'rejected') {
            throw new FailedToLoadComponentError(
                `Failed to load Component. ${result.reason}`
            )
        }

        values.push(result.value)
    })

    return values as ResultValuesArray
}

const parseTemplateContent = async (
    rawTemplate: Response
): Promise<string | boolean> => {
    try {
        return await rawTemplate
            .text()
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new SerializationError(
                `Failed to serialize given data. ${e.message}`
            )
        }

        return false
    }
}

const renderTemplate = (template: string, script: ScriptResponse): void => {
    const div = document.createElement('div')

    div.innerHTML = template
    document.body.appendChild(div)
    script.default.load()
    document.body.removeChild(div)
}
