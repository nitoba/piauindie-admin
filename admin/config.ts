import { AdminConfig } from '@keystone-6/core/types'

import { CustomNavigation } from './components/customNavigation'
import { Logo } from './components/logo'
export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
  Logo,
}
