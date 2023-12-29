import { loadComponent as loadNavbar } from '../Components/NavBar/+define'
import { useComponent } from '../Hooks/import-component'
import { useShadowRoot } from '../Hooks/shadow-root-template'
import { LoadComponentProcedure } from '@/Types/components'

export const loadComponent: LoadComponentProcedure = () => {
  customElements.define(`home-`, useShadowRoot({ id: 'home' }))

  useComponent('src/Components/NavBar', loadNavbar)
}
