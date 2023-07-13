import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'User Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'elements',
    title: 'Profile',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'color',
        title: 'Vehicle Info',
        type: 'item',
        classes: 'nav-item',
        url: '/vehicle',
        icon: 'ti ti-car'
      },
      {
        id: 'color',
        title: 'Emergency',
        type: 'item',
        classes: 'nav-item',
        url: '/emergency',
        icon: 'ti ti-car'
      }
    ]
  }
];
const NavigationItems1 = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'elements',
    title: 'Management',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'color',
        title: 'Emergency Requests',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'ti ti-car'
      },
      /*  {
        id: 'color',
        title: 'Emergency',
        type: 'item',
        classes: 'nav-item',
        url: '/emergency',
        icon: 'ti ti-car'
      } */
    ]
  }
];

@Injectable()
export class NavigationItem {
  constructor(private cookieService: CookieService) {}
  get() {
    const userRole = this.getUserRoleFromCookie();

    // Return different sets of navigation items based on the user's role
    if (userRole === 'admin') {
      return NavigationItems1;
    } else if (userRole === 'Driver') {
      console.log('display user role',userRole);
      return NavigationItems;
    }
    else{}

    // Return a default set of navigation items if the user's role is not recognized
    return [];
  }
  private getUserRoleFromCookie(): string {
    const userData = this.cookieService.get('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role;
    }
    return '';
  }
}