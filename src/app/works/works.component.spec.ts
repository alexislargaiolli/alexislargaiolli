import { Router } from '@angular/router';
import { AnimationService } from './../services/animation.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksComponent } from './works.component';

describe('WorksComponent', () => {
  let component: WorksComponent;
  let fixture: ComponentFixture<WorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorksComponent],
      providers: [
        { provide: AnimationService, useValue: '' },
        { provide: Router, useValue: RouterStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class RouterStub {
  navigateByUrl(url: string) { return url; }
}
