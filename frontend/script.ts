import { useComponent } from './src/Hooks/import-component'
import { loadComponent } from './src/Pages/+define'
import { loadComponent as loadNavbar } from './src/Components/NavBar/+define'

useComponent('src/Pages', loadComponent, 'home')
useComponent('src/Components/NavBar', loadNavbar)
