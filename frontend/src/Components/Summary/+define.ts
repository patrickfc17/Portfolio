import { useShadowRoot } from '@/Hooks/shadow-root-template'
import { LoadComponentProcedure } from '@/Types/components'

export const loadComponent: LoadComponentProcedure = () => {
  customElements.define('summary-', useShadowRoot({ id: 'summary' }))
}
