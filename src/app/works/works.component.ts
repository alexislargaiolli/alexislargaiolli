import { CLIENTS } from './../models/client.data';
import { Project } from './../models/project.model';
import { PROJECTS } from './../models/project.data';
import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  projects = PROJECTS;
  clients = CLIENTS;
  selectedProject: Project;

  constructor() { }

  ngOnInit() {
  }

  public selectProject(project: Project) {
    this.selectedProject = project;
  }

  public unselectProject() {
    this.selectedProject = null;
  }

}
