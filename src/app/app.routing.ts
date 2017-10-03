import { CanDesactivate } from './component.guard';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './home/home.component';
import { WorksComponent } from './works/works.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animation: 'home'
    }
  },
  {
    path: 'works',
    component: WorksComponent,
    data: {
      animation: 'works'
    },
    canDeactivate: [CanDesactivate],
    children: [
      {
        path: ':projectId',
        component: ProjectDetailComponent,
        data: {
          animation: 'works'
        },
        canDeactivate: [CanDesactivate]
      },
    ]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    data: {
      animation: 'clients'
    },
    canDeactivate: [CanDesactivate]
  },
  {
    path: 'contact',
    component: ContactFormComponent,
    data: {
      animation: 'contact'
    },
    canDeactivate: [CanDesactivate]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

export const AppRoutes = RouterModule.forRoot(routes);
