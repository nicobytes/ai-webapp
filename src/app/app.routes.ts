import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page'),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page')
  },
  {
    path: 'image',
    loadComponent: () => import('./image/image.page')
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page')
  },
];
