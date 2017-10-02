import { CanDesactivate } from './component.guard';
import { ProjectListItemComponent } from './project-list/project-list-item/project-list-item.component';
import { AnimationService } from './services/animation.service';
import { AppRoutes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WorksComponent } from './works/works.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MdIconModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdProgressBarModule } from '@angular/material';
import { SwiperModule } from 'angular2-useful-swiper';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { InViewportDirective } from './in-viewport.directive';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorksComponent,
    AboutComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ContactFormComponent,
    InViewportDirective,
    HomeComponent,
    ClientsComponent,
    ProjectListComponent,
    ProjectListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LazyLoadImageModule,
    BrowserAnimationsModule,
    AppRoutes,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    SwiperModule,
    MdProgressBarModule
  ],
  providers: [
    AnimationService,
    CanDesactivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
