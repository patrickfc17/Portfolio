import { useShadowRoot } from "@/src/Hooks/shadow-root-template"
import { LoadComponentProcedure } from "@/src/Types/components"

export const loadComponent: LoadComponentProcedure = () => {
    customElements.define('navbar-', useShadowRoot({ id: 'navbar' }))
}
