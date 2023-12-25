import { FailedToLoadElementError } from '../Errors/FailedToLoadElementError'
import { RequiredAttributeError } from '../Errors/RequiredAttributeError'
import { LoadComponentProcedure } from '../Types/components'

const loadComponent: LoadComponentProcedure = () => {
    class Home extends HTMLElement {
        private static _templateElement = document.querySelector<HTMLTemplateElement>(`template`)
        private static _templateId = this._templateElement?.id

        constructor() {
            super()

            const shadowRoot = this.attachShadow({ mode: 'open' })

            const templateStyle = document.querySelector<HTMLLinkElement>('link[rel="stylesheet"]')
            const templateContent = Home._templateElement?.content

            if (!templateContent || !templateStyle) {
                throw new FailedToLoadElementError()
            }

            shadowRoot?.append(templateStyle, templateContent)
        }

        public static get templateId(): string | undefined {
            return this._templateId
        }
    }

    if (!Home.templateId) {
        throw new RequiredAttributeError('The attribute "id" is required.')
    }

    customElements.define(`${Home.templateId}-`, Home)
}

export default {
    load: () => loadComponent()
}

