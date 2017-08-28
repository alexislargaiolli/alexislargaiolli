import { Slide } from './../models/slide.model';
import { Project } from './../models/project.model';
import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, HostListener, ElementRef, ViewChild } from '@angular/core';
import { trigger, transition, query, animate, style } from '@angular/animations';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [
    trigger('slideAnim', [
      transition('*=>*', [
        query(':enter', [style({ opacity: 0 })], { optional: true }),
        query(':leave', [
          animate('3000ms ease', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          animate('3000ms ease', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  public static readonly SWIPER_RATIO = 0.5625;

  @Input()
  project: Project;

  @ViewChild('swiper') swiper: any;

  swiperConfig: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    effect: 'coverflow',
    grabCursor: true
  };

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initSwiperHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initSwiperHeight();
  }

  /**
   * Initialize height of swiper component to prevent page scrolling when images are not loaded
   */
  private initSwiperHeight() {
    if (this.swiper) {
      const swiperElt = this.swiper.elementRef.nativeElement;
      swiperElt.style.height = `${swiperElt.offsetWidth * ProjectDetailComponent.SWIPER_RATIO}px`;
    }
  }

}
