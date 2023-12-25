import { FailedToLoadElementError } from '../Errors/FailedToLoadElementError'

const loadElement = () => {
    class Home extends HTMLElement {
        private static _templateElement = document.querySelector<HTMLTemplateElement>(`template`)
        private static _templateId = this._templateElement!.id

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

        public static get templateId(): string {
            return this._templateId
        }
    }

    customElements.define(`${Home.templateId}-`, Home)
}

export default {
    load: () => loadElement()
}
