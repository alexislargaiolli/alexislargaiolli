import { ScaleData } from './../models/scale-data.model';
import { Easing, EasingEnum } from './../utils/easing';
import { AnimationService } from './../services/animation.service';
import { PROJECTS } from './../models/project.data';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { Slide } from './../models/slide.model';
import { Project } from './../models/project.model';
import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, HostListener, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { trigger, transition, query, animate, style, AnimationBuilder, AnimationPlayer, stagger, AnimationMetadata, group, state } from '@angular/animations';
import { CanComponentDeactivate } from '../component.guard';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [
    trigger('slideOut', [
      transition('* => hiddingNext', [
        style({ opacity: 1, transform: 'translate(0%)' }),
        animate('200ms ease-in', style({ opacity: 0.5, transform: 'translate(-5%)' })),
      ]),
      transition('* => hiddingPrev', [
        style({ opacity: 1, transform: 'translate(0%)' }),
        animate('200ms ease-in', style({ opacity: 0.5, transform: 'translate(5%)' })),
      ]),
      transition('* => showingNext', [
        style({ opacity: 0.5, transform: 'translate(5%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translate(0%)' })),
      ]),
      transition('* => showingPrev', [
        style({ opacity: 0.5, transform: 'translate(-5%)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'translate(0%)' })),
      ]),
    ])
  ]
})
export class ProjectDetailComponent implements OnInit, OnDestroy, AfterViewInit, CanComponentDeactivate {

  @ViewChildren('imageSlide')
  imageSlides: QueryList<ElementRef>;

  @ViewChildren('fullScreenSlide')
  fullScreenSlide: QueryList<ElementRef>;

  project: Project;
  projects = PROJECTS;

  enterAnim: AnimationPlayer;
  leaveAnim: AnimationPlayer;
  enterFullscreenAnim: AnimationPlayer;
  leaveFullscreenAnim: AnimationPlayer;
  currentSlideIndex = 0;
  fullscreen = false;
  slideState = 'idle';

  constructor(
    private _hostElement: ElementRef,
    private _activatedRoute: ActivatedRoute,
    private _animationService: AnimationService,
    private _builder: AnimationBuilder
  ) {
    // tslint:disable-next-line:triple-equals
    this.project = this.projects.find(p => p.id == _activatedRoute.snapshot.params.projectId);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.enterAnim) {
      this.enterAnim.destroy();
    }
    if (this.leaveAnim) {
      this.leaveAnim.destroy();
    }
  }

  ngAfterViewInit() {
    this.buildAnim();
    if (this.enterAnim) {
      this.enterAnim.play();
    }
  }

  public nextSlide() {
    if (this.slideState === 'idle') {
      this.slideState = 'hiddingNext';
    }
  }

  public prevSlide() {
    if (this.slideState === 'idle') {
      this.slideState = 'hiddingPrev';
    }
  }

  public onSlideAnimOut() {
    if (this.slideState === 'hiddingNext') {
      this.currentSlideIndex++;
      if (this.currentSlideIndex >= this.project.slides.length) {
        this.currentSlideIndex = 0;
      }
      this.slideState = 'showingNext';
    } else if (this.slideState === 'hiddingPrev') {
      this.currentSlideIndex--;
      if (this.currentSlideIndex < 0) {
        this.currentSlideIndex = this.project.slides.length - 1;
      }
      this.slideState = 'showingPrev';
    } else if (this.slideState === 'showingNext') {
      this.slideState = 'idle';
    } else if (this.slideState === 'showingPrev') {
      this.slideState = 'idle';
    }
  }

  public toogleFullscreen() {
    if (this.fullscreen === true) {
      this.buildLeaveFullsreenAnim();
      this.leaveFullscreenAnim.play();
      this.leaveFullscreenAnim.onDone(() => this.fullscreen = false);
    }
    if (this.fullscreen === false) {
      this.fullscreen = true;
      setTimeout(() => {
        this.buildFullsreenAnim();
        this.enterFullscreenAnim.play();
      }, 0);
    }
  }

  public canDeactivate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.leaveAnim) {
        this.leaveAnim.play();
        this.leaveAnim.onDone(() => {
          resolve(true);
        });
      }
    });
  }

  // -------------------------------------//
  // -------- ANIMATION BUILDING ---------//
  // -------------------------------------//

  private buildAnim() {
    const metadatas: AnimationMetadata[] = [];
    const initialRect = this._animationService.getData(AnimationService.SELECTED_PROJECT_IMAGE_POSITION_KEY);
    if (initialRect) {
      const finalRect = this.imageSlides.first.nativeElement.getBoundingClientRect();
      const currentRect = finalRect;
      const enterAnimMetadata = this._animationService.createScaleTranslateAnimationMetadata(initialRect, finalRect, currentRect,
        EasingEnum.easeOutCubic, EasingEnum.easeOutCubic, EasingEnum.easeOutCubic, EasingEnum.easeOutCubic);
      metadatas.push(
        query('.image-slide:first-child', [
          ...enterAnimMetadata
        ])
      );

      const leaveAnimMetadata = this._animationService.createScaleTranslateAnimationMetadata(finalRect, initialRect, currentRect,
        EasingEnum.easeInCubic, EasingEnum.easeInCubic, EasingEnum.easeInCubic, EasingEnum.easeInCubic);

      this.leaveAnim = this._builder.build(query('.image-slide:first-child', [
        ...leaveAnimMetadata
      ])).create(this._hostElement.nativeElement);
    }
    metadatas.push(
      query('h2, a, p, .techno-list', [
        style({ opacity: 0, transform: 'translateX(-10%)' }),
      ])
    );
    metadatas.push(
      query('h2, a, p, .techno-list', [
        stagger(40,
          animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        )
      ])
    );
    this.enterAnim = this._builder.build(metadatas).create(this._hostElement.nativeElement);
  }

  private buildFullsreenAnim() {
    const fullscreenImage = this.fullScreenSlide.find((elt) => !elt.nativeElement.hidden);
    const smallImage = this.imageSlides.find((elt) => !elt.nativeElement.hidden);
    const finalRect = fullscreenImage.nativeElement.getBoundingClientRect();
    const currentRect = finalRect;
    const initialRect = smallImage.nativeElement.getBoundingClientRect();
    const enterFullscreenMetadata = this._animationService.createScaleTranslateAnimationMetadata(initialRect, finalRect, currentRect,
      EasingEnum.easeOutCubic, EasingEnum.easeOutCubic, EasingEnum.easeOutCubic, EasingEnum.easeOutCubic);
    this.enterFullscreenAnim = this._builder.build([
      query('.image-wrapper', style({ opacity: 1 })),
      group([
        query('.image-gallery-fullscreen', [
          style({ background: 'rgba(0, 0, 0, 0)' }),
          animate('200ms ease-out', style({ background: 'rgba(0, 0, 0, 0.8)' }))
        ]),
        query('.image-gallery-fullscreen .image-wrapper .image-slide:not(hidden)', enterFullscreenMetadata)
      ])
    ]).create(this._hostElement.nativeElement);
  }

  private buildLeaveFullsreenAnim() {
    const fullscreenImage = this.fullScreenSlide.find((elt) => !elt.nativeElement.hidden);
    const smallImage = this.imageSlides.find((elt) => !elt.nativeElement.hidden);
    const initialRect = fullscreenImage.nativeElement.getBoundingClientRect();
    const finalRect = smallImage.nativeElement.getBoundingClientRect();
    const currentRect = initialRect;
    const leaveFullscreenMetadata = this._animationService.createScaleTranslateAnimationMetadata(initialRect, finalRect, currentRect,
      EasingEnum.easeInCubic, EasingEnum.easeInCubic, EasingEnum.easeInCubic, EasingEnum.easeInCubic);
    this.leaveFullscreenAnim = this._builder.build([
      group([
        query('.image-gallery-fullscreen', [
          style({ background: 'rgba(0, 0, 0, 0.8)' }),
          animate('200ms ease-in', style({ background: 'rgba(0, 0, 0, 0)' }))
        ]),
        query('.image-gallery-fullscreen .image-wrapper .image-slide:not(hidden)', leaveFullscreenMetadata)
      ])
    ]).create(this._hostElement.nativeElement);
  }

}
