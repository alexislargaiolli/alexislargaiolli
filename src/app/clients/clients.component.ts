import { CLIENTS } from '../models/client.data';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './../component.guard';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationPlayer, query, style, animate, stagger } from '@angular/animations';
import { BoundingRect } from '../models/bouding-rect.model';
import { AnimationService } from '../services/animation.service';
import { EasingEnum } from '../utils/easing';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnDestroy, AfterViewInit, CanComponentDeactivate {

  @ViewChild('title')
  titleElement: ElementRef;

  enterAnim: AnimationPlayer;
  leaveAnim: AnimationPlayer;
  clients = CLIENTS;

  constructor(
    private _animationService: AnimationService,
    private _location: Location,
    private _builder: AnimationBuilder,
    private _hostElement: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.createEnterAnimation();
    if (this.enterAnim) {
      this.enterAnim.play();
    }
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
    const initialTitlePosition: BoundingRect = this._animationService.getData('/clients');
    if (initialTitlePosition) {
      const currentPosition: BoundingRect = this.titleElement.nativeElement.getBoundingClientRect();
      const titleAnim = this._animationService.createTranslationAnimationMetadata(initialTitlePosition, currentPosition, currentPosition,
        EasingEnum.linear, EasingEnum.easeInCubic, 10, 200);
      this.enterAnim = this._builder.build([
        query('.back-button, .client-list-item', style({ opacity: 0 })),
        query('.home-title', titleAnim),
        query('.back-button', animate('100ms ease-out', style({ opacity: 1 }))),
        query('.client-list-item', [
          style({ opacity: 0, transform: 'translateX(-10%)' }),
        ]),
        query('.client-list-item', [
          stagger('40ms', [
            animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ])
        ])
      ]).create(this._hostElement.nativeElement);
    }
  }

  private createLeaveAnimation() {
    const finalTitlePosition: BoundingRect = this._animationService.getData('/clients');
    if (finalTitlePosition) {
      const currentPosition: BoundingRect = this.titleElement.nativeElement.getBoundingClientRect();
      const titleAnim = this._animationService.createTranslationAnimationMetadata(currentPosition, finalTitlePosition, currentPosition,
        EasingEnum.linear, EasingEnum.easeOutCubic);
      this.leaveAnim = this._builder.build([
        query('.back-button, .client-list-item', animate('150ms ease-in', style({ opacity: 0 }))),
        query('.home-title', titleAnim),
      ]).create(this._hostElement.nativeElement);
    }
  }

}
