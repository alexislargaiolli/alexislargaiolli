import { AnimationService } from './../services/animation.service';
import { Component, OnInit, HostBinding, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnimationBuilder, style, animate, AnimationPlayer, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private enterAnim: AnimationPlayer;
  private realLink: AnimationPlayer;

  constructor(private _componentRef: ElementRef,
    private _router: Router,
    public _builder: AnimationBuilder,
    private _animationDataStoreService: AnimationService,
    private _hostElement: ElementRef
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.enterAnim) {
      this.enterAnim.destroy();
    }
  }

  ngAfterViewInit(): void {
    this.createAnimation();
    this.enterAnim.play();
  }

  goTo(sourceLinkNativeElement, targetRoute: string, cssIdClass) {
    const rect = sourceLinkNativeElement.getBoundingClientRect();
    this._animationDataStoreService.storeData(targetRoute, rect);
    this._animationDataStoreService.storeData(AnimationService.PREVIOUS_PAGE_KEY, targetRoute);

    const notPreviousPageLink = `:not(.${targetRoute.replace('/', '')})`;
    this.realLink = this._builder.build([
      query(`h1, h2, p, a${notPreviousPageLink}`, animate('200ms ease-out', style({ opacity: 0 }))),
    ]).create(this._hostElement.nativeElement);
    this.realLink.onDone(() => {
      this._router.navigate([targetRoute]);
    });
    this.realLink.play();
  }

  createAnimation() {
    const previous = this._animationDataStoreService.getData(AnimationService.PREVIOUS_PAGE_KEY);
    let notPreviousPageLink = '';
    if (previous) {
      notPreviousPageLink = `:not(.${previous.replace('/', '')})`;
      this.enterAnim = this._builder.build([
        query('h1, h2, p, a' + notPreviousPageLink, style({ opacity: 0 })),
        query('h1, h2, p, a' + notPreviousPageLink,
          animate('200ms ease-in', style({ opacity: 1 }))
        ),
      ]).create(this._hostElement.nativeElement);
    } else {
      this.enterAnim = this._builder.build([
        query('h1, h2, p, a' + notPreviousPageLink, style({ opacity: 0 })),
        query('h1, h2, p, a' + notPreviousPageLink,
          stagger('40ms', animate('200ms ease-in', style({ opacity: 1 })))
        ),
      ]).create(this._hostElement.nativeElement);
    }


  }
}
