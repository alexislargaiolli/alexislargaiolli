import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Directive, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef, Renderer, HostBinding, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';

@Directive({
  selector: '[appInViewport]'
})
export class InViewportDirective implements OnInit {

  elementPos: number;
  elementHeight: number;

  scrollPos: number;
  windowHeight: number;

  @HostBinding('class.inviewport')
  visible = false;

  @HostBinding('class.inviewportDetection')
  classes = true;

  scrollEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  resizeEvent$: Subject<Window> = new Subject<Window>();

  constructor(private _elementRef: ElementRef, private cdRef: ChangeDetectorRef) {
    this.scrollEvent$.debounceTime(200).subscribe(() => this.onScroll());
    this.resizeEvent$.debounceTime(200).subscribe(() => this.onResize());
  }

  getOffsetTop(element: any) {
    let offsetTop = element.offsetTop || 0;
    if (element.offsetParent) {
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }

  checkVisibility() {
    this.scrollPos = window.scrollY;
    this.windowHeight = window.innerHeight;
    this.elementPos = this.getOffsetTop(this._elementRef.nativeElement);
    this.elementHeight = this._elementRef.nativeElement.clientHeight;
    console.log(this.elementPos + ' ' + (this.scrollPos + this.windowHeight));
    if (this.elementPos < (this.scrollPos + this.windowHeight)) {
      if (!this.visible) {
        this.visible = true;
        this.cdRef.detectChanges();
        console.log('visible');
      }
    } else {
      if (this.visible) {
        this.visible = false;
        this.cdRef.detectChanges();
        console.log('not visible');
      }
    }
  }

  ngOnInit() {
  }

  onScroll() {
    this.checkVisibility();
  }

  onResize() {
    this.checkVisibility();
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    this.scrollEvent$.next($event);
  }

  @HostListener('window:resize', ['$event']) onResizeEvent($event) {
    this.resizeEvent$.next($event);
  }
}
