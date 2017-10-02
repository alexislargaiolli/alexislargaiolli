import {
    animate, AnimationMetadata, state, style, transition,
    trigger, group, animation, query, stagger, animateChild
} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
    // no need to animate anything on load
    transition(':enter', []),
    // when we go away from the home page to support
    transition('home => works', [
        query(':enter', style({ opacity: 0, position: 'absolute', height: '*', width: '*' })),
        query(':leave section', [
            animateChild(),
            animate('300ms ease-in-out', style({ opacity: 0 })),
            animateChild()
        ]),
        query(':leave .menu', [
            animate('300ms ease-in-out', style({ opacity: 0 })),
            animateChild()
        ]),

        query(':enter', [
            animate('300ms ease-in-out', style({ opacity: 1 })),
            animateChild()
        ])
    ]),
    transition('home => clients', [
        query(':enter', style({ position: 'absolute', opacity: 0 })),
        query(':leave', [
            animate('0.3s', style({ opacity: 0 })),
            animateChild()
        ])
    ]),
    // and when we go back home
    transition('supportPage => homePage', [
        // ...
    ])
]);
