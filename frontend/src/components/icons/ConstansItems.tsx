import { Icon } from '@iconify/react';
import {SideNavItem} from './Types';

export const SIDE_ITEMS:SideNavItem[] = [
    {
        title: 'Home',
        path: '/',
        icon: <Icon icon="lucide:home" width="24" height="24" />,
      },
      {
        title: 'Projects',
        path: '/game',
        icon: <Icon icon="lucide:folder" width="24" height="24" />,
      },
      {
        title: 'Messages',
        path: '/messages',
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
      },
      {
        title: 'Settings',
        path: '/settings',
        icon: <Icon icon="lucide:settings" width="24" height="24" />,

      },
      {
        title: 'Help',
        path: '/help',
        icon: <Icon  icon="lucide:help-circle" width="24" height="24" />,
      }
]