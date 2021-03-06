import {
    animate, AnimationMetadata, state, style, transition,
    trigger, group, animation, query, stagger, animateChild
} from '@angular/animations';

// Component transition animations
export const contactFormAnim: AnimationMetadata =
    trigger('contactFormAnim', [
        transition('IDLE => SENDING', [

            query(':enter', style({ opacity: 0 })),
            query(':leave', style({ position: 'absolute', width: '*' })),

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

            query(':enter md-icon, :enter p, :enter button', style({ opacity: 0 }), { optional: true }),
            query(':leave', style({ position: 'absolute' })),

            query(':leave > *', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave > *', [
                stagger('40ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter md-icon, :enter p, :enter button', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter md-icon, :enter p, :enter button', [
                stagger('40ms',
                    animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
                )
            ], { optional: true }),
        ]),

        transition('SUCCESS => IDLE', [

            query(':enter', style({ position: 'absolute', opacity: 0 })),
            query(':leave', style({})),

            query(':leave md-icon, :leave p, :leave button', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave md-icon, :leave p, :leave button', [
                stagger('40ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter', style({ position: 'inherit', opacity: 1 })),

            query(':enter md-form-field, :enter button', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter md-form-field, :enter button', [
                stagger('40ms',
                    animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
                )
            ]),
        ]),

        transition('SENDING => ERROR', [

            query(':enter md-icon, :enter p, :enter button', style({ opacity: 0 }), { optional: true }),
            query(':leave', style({ position: 'absolute' })),

            query(':leave > *', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),
            query(':leave > *', [
                stagger('40ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter md-icon, :enter p, :enter button', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter md-icon, :enter p, :enter button', [
                stagger('40ms',
                    animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
                )
            ], { optional: true }),
        ]),

        transition('ERROR => SENDING', [

            query(':enter', style({ opacity: 0, position: 'absolute' })),

            query(':leave md-icon, :leave p, :leave button', style({
                opacity: 1,
                transform: 'translateX(0%)'
            })),

            query(':leave md-icon, :leave p, :leave button', [
                stagger('50ms', animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(5%)' }))),
            ], { optional: true }),

            query(':enter', style({
                opacity: 0,
                transform: 'translateX(-5%)'
            })),
            query(':enter', [
                stagger('40ms', animate('150ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' })))
            ], { optional: true }),
        ]),
    ]);
