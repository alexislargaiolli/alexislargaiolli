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

  constructor(private _componentRef: ElementRef,
    private _router: Router,
    public builder: AnimationBuilder,
    private _animationDataStoreService: AnimationService
  ) { }

  ngOnInit() {
  }

  goTo(sourceLinkNativeElement, targetRoute) {
    const rect = sourceLinkNativeElement.getBoundingClientRect();
    this._animationDataStoreService.storeData(targetRoute, rect);
    this._router.navigate([targetRoute]);
  }
}
