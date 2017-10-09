import { CanComponentDeactivate } from '../component.guard';
import { TranslationData } from './../models/translation-data.model';
import { Easing, EasingEnum } from './../utils/easing';
import { Subscription } from 'rxjs/Subscription';
import { ReversableAnim } from './../models/reversable-anim';
import { BoundingRect } from './../models/bouding-rect.model';
import {
  animate, AnimationMetadata, state, style, transition,
  trigger, group, animation, query, stagger, animateChild, AnimationPlayer, AnimationBuilder, sequence
} from '@angular/animations';
import { Location, PlatformLocation } from '@angular/common';
import {
  OnInit, Component, ViewChild, ElementRef, AfterViewInit, OnDestroy,
  ChangeDetectorRef, ViewChildren, QueryList
} from '@angular/core';
import { AnimationService } from './../services/animation.service';
import { CLIENTS } from './../models/client.data';
import { Project } from './../models/project.model';
import { PROJECTS } from './../models/project.data';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnDestroy, AfterViewInit, CanComponentDeactivate {

  @ViewChild('title')
  titleElement: ElementRef;

  selectedProject: Project = null;

  projects = PROJECTS;
  routerSubscription: Subscription;

  enterAnim: AnimationPlayer;
  leaveAnim: AnimationPlayer;
  selectProjectAnim: AnimationPlayer;
  unselectProjectAnim: AnimationPlayer;
  hideList = false;

  constructor(
    private _animationService: AnimationService,
    private _router: Router,
    private _builder: AnimationBuilder,
    private _location: Location,
    private _hostElement: ElementRef
  ) {
    this.routerSubscription = this._router.events.filter(e => e instanceof NavigationEnd).pairwise()
      .subscribe((events: [NavigationEnd, NavigationEnd]) => {
        const from = events[0].url;
        const to = events[1].url;
        if (from.match(/\/works\/\d/i)) {
          this.unselectProject();
        }
        if (to.match(/\/works\/\d/i)) {
          this.hideList = true;
        }
      });
  }

  /**
   * Start enter animation on component init
   */
  ngAfterViewInit() {
    this.createEnterAnimation();
    if (this.enterAnim) {
      this.enterAnim.play();
    }
  }

  /**
   * Perform leave animation before exit de component
   */
  public canDeactivate(): Promise<boolean> {
    const p = new Promise<boolean>((resolve, reject) => {
      if (this.selectedProject) {
        resolve(false);
        this.unselectProject(() => {

        });
      } else {
        this.createLeaveAnimation();
        if (this.leaveAnim) {
          this.leaveAnim.play();
          this.leaveAnim.onDone(() => {
            resolve(true);
          });
        }
      }
    });
    return p;
  }

  /**
   * Back to home page using location.back() rather than /home to unselect project before if a project is selected
   */
  public back() {
    if (this.selectedProject) {
      this._location.back();
    } else {
      this._router.navigate(['/home']);
    }
  }

  public selectProject(project: Project, selectedProjectTitle: any, selectedProjectImage: any) {
    if (this.selectedProject !== null) {
      return;
    }
    this._animationService.storeData(AnimationService.SELECTED_PROJECT_IMAGE_POSITION_KEY, selectedProjectImage.getBoundingClientRect());
    this.selectedProject = project;
    this.createSelectProjectAnimation(project.id, selectedProjectTitle);
    this.createUnselectProjectAnimation(project.id, selectedProjectTitle);
    this.selectProjectAnim.play();
    this.selectProjectAnim.onDone(() => {
      this._router.navigate(['/works', project.id]);
    });
  }

  public unselectProject(onDone?: () => void) {
    this.hideList = false;
    this.unselectProjectAnim.play();
    this.unselectProjectAnim.onDone(() => {
      this.selectedProject = null;
      if (onDone) {
        onDone();
      }
    });
  }

  ngOnDestroy() {
    if (this.enterAnim) {
      this.enterAnim.destroy();
    }
    if (this.leaveAnim) {
      this.leaveAnim.destroy();
    }
    if (this.selectProjectAnim) {
      this.selectProjectAnim.destroy();
    }
    if (this.unselectProjectAnim) {
      this.unselectProjectAnim.destroy();
    }
    this.routerSubscription.unsubscribe();
  }


  // -------------------------------------//
  // -------- ANIMATION BUILDING ---------//
  // -------------------------------------//

  private createEnterAnimation() {
    const initialTitlePosition: BoundingRect = this._animationService.getData('/works');
    if (initialTitlePosition) {
      const currentPosition: BoundingRect = this.titleElement.nativeElement.getBoundingClientRect();
      const titleAnim = this._animationService.createTranslationAnimationMetadata(initialTitlePosition, currentPosition, currentPosition,
        EasingEnum.linear, EasingEnum.easeInCubic, 10, 200);
      this.enterAnim = this._builder.build([
        query('.back-button, .project-list-item', style({ opacity: 0 })),
        query('.home-title', titleAnim),
        query('.back-button', animate('100ms ease-out', style({ opacity: 1 }))),
        query('.project-list-item', [
          style({ opacity: 0, transform: 'translateX(-10%)' }),
        ]),
        query('.project-list-item', [
          stagger('40ms', [
            animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ])
        ])
      ]).create(this._hostElement.nativeElement);
    }
  }

  private createLeaveAnimation() {
    const finalTitlePosition: BoundingRect = this._animationService.getData('/works');
    if (finalTitlePosition) {
      const currentPosition: BoundingRect = this.titleElement.nativeElement.getBoundingClientRect();
      const titleAnim = this._animationService.createTranslationAnimationMetadata(currentPosition, finalTitlePosition, currentPosition,
        EasingEnum.linear, EasingEnum.easeOutCubic);
      this.leaveAnim = this._builder.build([
        query('.back-button, .project-list-item', [
          animate('150ms ease-in', style({ opacity: 0 })),
        ]),
        query('.home-title', titleAnim),
      ]).create(this._hostElement.nativeElement);
    }
  }

  private createSelectProjectAnimation(projectId: number, selectedProjectTitle) {
    if (this.selectProjectAnim) {
      this.selectProjectAnim.destroy();
    }
    this.selectProjectAnim = this._builder.build([
      query(`.project-list-item:not(.project-${projectId}), .project-list-item.project-${projectId} h2`, [
        style({ opacity: 1 }),
        animate('150ms ease-in', style({ opacity: 0 })),
      ])
    ]).create(this._hostElement.nativeElement);
  }

  private createUnselectProjectAnimation(projectId: number, selectedProjectTitle) {
    if (this.unselectProjectAnim) {
      this.unselectProjectAnim.destroy();
    }
    this.unselectProjectAnim = this._builder.build([
      query(`.project-list-item:not(.project-${projectId}), .project-list-item.project-${projectId} h2`, [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 })),
      ])
    ]).create(this._hostElement.nativeElement);
  }
}
