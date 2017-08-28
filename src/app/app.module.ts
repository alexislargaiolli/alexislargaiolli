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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WorksComponent,
    AboutComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ContactFormComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
