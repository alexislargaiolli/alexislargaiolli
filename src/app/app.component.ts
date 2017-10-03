import { Router } from '@angular/router';
import { routeAnimation } from './app.animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation]
})
export class AppComponent {

  constructor(private _router: Router) {
    this._router.navigate(['/home']);
  }

  prepRouteState(outlet: any) {
    const next = outlet.activatedRouteData['animation'] || 'firstPage';
    return next;
  }
}
