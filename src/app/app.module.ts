import { LinkPipe } from './utils/link.pipe';
import { CanDesactivate } from './component.guard';
import { AnimationService } from './services/animation.service';
import { AppRoutes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WorksComponent } from './works/works.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { MdIconModule, MdInputModule, MdProgressBarModule, MatTooltipModule, MdButtonModule } from '@angular/material';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    WorksComponent,
    ProjectDetailComponent,
    ContactFormComponent,
    HomeComponent,
    ClientsComponent,
    LinkPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutes,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdProgressBarModule,
    MatTooltipModule
  ],
  providers: [
    AnimationService,
    CanDesactivate
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
