import {
    animate, AnimationMetadata, state, style, transition,
    trigger, group, animation, query, stagger, animateChild
} from '@angular/animations';

// Component transition animations
export const contactFormAnim: AnimationMetadata =
    trigger('contactFormAnim', [
        transition('void => *', [

            query(':enter', [
                style({
                    opacity: 0,
                    transform: 'translateX(-5%)'
                }),
                animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
            ], { optional: true }),

        ]),
        transition('IDLE => SENDING', [

            query(':enter', style({ opacity: 0 })),
            query(':leave', style({ position: 'absolute' })),

            query(':leave > *', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave > *', [
                stagger('40ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter', [
                stagger('40ms', animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' })))
            ], { optional: true }),
        ]),

        transition('SENDING => SUCCESS', [

            query(':enter md-icon, :enter span, :enter button', style({ opacity: 0 }), { optional: true }),
            query(':leave', style({ position: 'absolute' })),

            query(':leave > *', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave > *', [
                stagger('40ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter md-icon, :enter span, :enter button', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter md-icon, :enter span, :enter button', [
                stagger('40ms',
                    animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
                )
            ], { optional: true }),
        ]),

        transition('SUCCESS => IDLE', [

            query(':enter', style({ position: 'absolute', opacity: 0 })),
            query(':leave >*', style({})),

            query(':leave md-icon, :leave span, :leave button', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave md-icon, :leave span, :leave button', [
                stagger('40ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter .mat-form-field', style({
                position: 'inherit',
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter .mat-form-field', [
                stagger('40ms',
                    animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
                )
            ], { optional: true }),
        ]),

        transition('SENDING => ERROR', [

            query(':enter md-icon, :enter span, :enter button', style({ opacity: 0 }), { optional: true }),
            query(':leave', style({ position: 'absolute' })),

            query(':leave > *', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave > *', [
                stagger('100ms', animate('200ms ease-in-out', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter md-icon, :enter span, :enter button', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter md-icon, :enter span, :enter button', [
                stagger('50ms',
                    animate('300ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' }))
                )
            ], { optional: true }),
        ]),

        transition('ERROR => SENDING', [

            query(':enter', style({ opacity: 0, position: 'absolute' })),

            query(':leave md-icon, :leave span, :leave button', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),

            query(':leave md-icon, :leave span, :leave button', [
                stagger('50ms', animate('150ms ease-in-out', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter', [
                stagger('100ms', animate('300ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' })))
            ], { optional: true }),
        ]),
    ]);
