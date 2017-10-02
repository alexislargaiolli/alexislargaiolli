import { trigger, style, transition, state, animate, query, stagger } from '@angular/animations';
import { PROJECTS } from './../models/project.data';
import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('projectListAnim', [
      state('hidden', style({ opacity: 0 })),
      state('shown', style({ opacity: 1 })),
      transition('hidden => shown', [
        animate(0),
        query('.project-list-item', [
          style({ opacity: '0', transform: 'translateX(50px)' }),
          stagger(100, [
            animate(500, style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ]),
      transition('shown => hidden', [
        animate(0),
        query('.project-list-item', [
          style({ opacity: '1', transform: 'translateX(0)' }),
          stagger(50, [
            animate(100, style({ opacity: 0, transform: 'translateX(100px)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@projectListAnim')
  state = 'hidden';

  @Output()
  selectProject: EventEmitter<Project> = new EventEmitter<Project>();

  projects = PROJECTS;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set show(show: boolean) {
    this.state = show ? 'shown' : 'hidden';
  }

  select(project: Project) {
    this.selectProject.emit(project);
  }

}
