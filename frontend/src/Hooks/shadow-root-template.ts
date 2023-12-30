import { FailedToLoadElementError } from "../Errors/FailedToLoadElementError"
import { RequiredAttributeError } from "../Errors/RequiredAttributeError"

type NewComponentLoaderProps = {
    id: string,
    style?: boolean,
}
type NewComponentDefinitionFuncType = (params: NewComponentLoaderProps) => typeof HTMLElement

export const useShadowRoot: NewComponentDefinitionFuncType = ({ id, style = true }: NewComponentLoaderProps) => {
    return class extends HTMLElement {
        constructor() {
            super()

            const shadowRoot = this.attachShadow({ mode: 'open' })

            const template = document.querySelector<HTMLTemplateElement>(`template[id="${id}"]`)

            if (!template || !(template instanceof HTMLTemplateElement)) {
                throw new FailedToLoadElementError()
            }

            if (!template.id || template.id !== id) {
                throw new RequiredAttributeError()
            }

            const templateStyle = !style ? '' :
                document.querySelector<HTMLLinkElement>(`link[template="${id}"]`)

            if (templateStyle === null) {
                throw new FailedToLoadElementError()
            }

            shadowRoot.append(templateStyle, template.content.cloneNode(true))
        }
    }
}
