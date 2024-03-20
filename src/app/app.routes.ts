import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./client/client.routes').then((m) => m.CLIENT_ROUTES),
  },
];
