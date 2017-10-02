import { AnimationService } from './../services/animation.service';
import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('projectButton')
  public projectButton;

  @ViewChild('workLink')
  workLink: ElementRef;

  constructor(private _componentRef: ElementRef,
    private _router: Router,
    public builder: AnimationBuilder,
    private _animationDataStoreService: AnimationService
  ) { }

  ngOnInit() {
  }

  animate() {
    // this makes instructions on how to build the animation
    const factory = this.builder.build([
      style({ transform: 'translate(0,0)' }),
      animate('350ms cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translate(-100px,-100px)' }))
    ]);

    // this creates the animation
    const player = factory.create(this.projectButton.nativeElement);

    // start it off
    player.play();
  }

  goTo(sourceLinkNativeElement, targetRoute) {
    const rect = sourceLinkNativeElement.getBoundingClientRect();
    this._animationDataStoreService.storeData(targetRoute, rect);
    this._router.navigate([targetRoute]);
  }
}
