import { AboutComponent } from './about/about.component';
import { WorksComponent } from './works/works.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'works',
    component: WorksComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: '/works',
    pathMatch: 'full'
  },
];

export const AppRoutes = RouterModule.forRoot(routes);
