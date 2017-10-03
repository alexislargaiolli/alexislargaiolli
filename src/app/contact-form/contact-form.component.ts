import { CanComponentDeactivate } from './../component.guard';
import { AnimationBuilder, AnimationPlayer, query, style, animate, stagger } from '@angular/animations';
import { AnimationService } from './../services/animation.service';
import { contactFormAnim } from './contact-form.animation';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BoundingRect } from '../models/bouding-rect.model';
import { EasingEnum } from '../utils/easing';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations: [contactFormAnim]
})
export class ContactFormComponent implements OnDestroy, AfterViewInit, CanComponentDeactivate {

  public readonly STATUS_IDLE = 'IDLE';
  public readonly STATUS_SENDING = 'SENDING';
  public readonly STATUS_SUCCESS = 'SUCCESS';
  public readonly STATUS_ERROR = 'ERROR';

  @ViewChild('title')
  titleElement: ElementRef;

  enterAnim: AnimationPlayer;
  leaveAnim: AnimationPlayer;

  status: string;

  constructor(
    private http: HttpClient,
    private _animationService: AnimationService,
    private _location: Location,
    private _builder: AnimationBuilder,
    private _hostElement: ElementRef
  ) {
    this.status = this.STATUS_IDLE;
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

  sendMessage(form: NgForm) {
    if (form.valid) {
      this.status = this.STATUS_SENDING;
      this.http.post('/contact', form.value)
        .subscribe(
        (res) => {
          this.status = this.STATUS_SUCCESS;
        },
        (error: HttpErrorResponse) => {
          this.status = this.STATUS_ERROR;
        }
        );
    }
  }

  reset(form: NgForm) {
    form.reset();
    form.resetForm();
    this.status = this.STATUS_IDLE;
  }

  public canDeactivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.createLeaveAnimation();
      if (this.leaveAnim) {
        this.leaveAnim.play();
        this.leaveAnim.onDone(() => {
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }

  public back() {
    this._location.back();
  }

  ngOnDestroy(): void {
    if (this.enterAnim) {
      this.enterAnim.destroy();
    }
    if (this.leaveAnim) {
      this.leaveAnim.destroy();
    }
  }

  // -------------------------------------//
  // -------- ANIMATION BUILDING ---------//
  // -------------------------------------//

  private createEnterAnimation() {
    const initialTitlePosition: BoundingRect = this._animationService.getData('/contact');
    if (initialTitlePosition) {
      const currentPosition: BoundingRect = this.titleElement.nativeElement.getBoundingClientRect();
      const titleAnim = this._animationService.createTranslationAnimationMetadata(initialTitlePosition, currentPosition, currentPosition,
        EasingEnum.linear, EasingEnum.easeInCubic, 10, 200);
      this.enterAnim = this._builder.build([
        query('.back-button, h2, md-form-field, .send-btn', style({ opacity: 0 })),
        query('.home-title', titleAnim),
        query('.back-button, h2', animate('100ms ease-out', style({ opacity: 1 }))),
        query('md-form-field, .send-btn', style({ transform: 'translateX(-5%)' })),
        query('md-form-field, .send-btn',
          stagger('40ms', animate('100ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })))
        )
      ]).create(this._hostElement.nativeElement);
    }
  }

  private createLeaveAnimation() {
    const finalTitlePosition: BoundingRect = this._animationService.getData('/contact');
    if (finalTitlePosition) {
      const currentPosition: BoundingRect = this.titleElement.nativeElement.getBoundingClientRect();
      const titleAnim = this._animationService.createTranslationAnimationMetadata(currentPosition, finalTitlePosition, currentPosition,
        EasingEnum.linear, EasingEnum.easeOutCubic);
      this.leaveAnim = this._builder.build([
        query('.back-button, h2, md-form-field, .send-btn', animate('150ms ease-in', style({ opacity: 0 }))),
        query('.home-title', titleAnim),
      ]).create(this._hostElement.nativeElement);
    }
  }

}
