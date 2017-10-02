export enum EasingEnum {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInQuart,
    easeOutQuart,
    easeInOutQuart,
    easeInQuint,
    easeOutQuint,
    easeInOutQuint
}

export class Easing {

    // no easing; no acceleration
    static linear(t) { return t; }
    // accelerating from zero velocity
    static easeInQuad(t) { return t * t; }
    // decelerating to zero velocity
    static easeOutQuad(t) { return t * (2 - t); }
    // acceleration until halfway; then deceleration
    static easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
    // accelerating from zero velocity
    static easeInCubic(t) { return t * t * t; }
    // decelerating to zero velocity
    static easeOutCubic(t) { return (--t) * t * t + 1; }
    // acceleration until halfway; then deceleration
    static easeInOutCubic(t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
    // accelerating from zero velocity
    static easeInQuart(t) { return t * t * t * t; }
    // decelerating to zero velocity
    static easeOutQuart(t) { return 1 - (--t) * t * t * t; }
    // acceleration until halfway; then deceleration
    static easeInOutQuart(t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; }
    // accelerating from zero velocity
    static easeInQuint(t) { return t * t * t * t * t; }
    // decelerating to zero velocity
    static easeOutQuint(t) { return 1 + (--t) * t * t * t * t; }
    // acceleration until halfway; then deceleration
    static easeInOutQuint(t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }

    static getFunction(type: EasingEnum): (t: number) => number {
        switch (type) {
            case EasingEnum.linear:
                return Easing.linear;
            case EasingEnum.easeInCubic:
                return Easing.easeInCubic;
            case EasingEnum.easeOutCubic:
                return Easing.easeOutCubic;
            case EasingEnum.easeInOutCubic:
                return Easing.easeInOutCubic;
            case EasingEnum.easeInQuad:
                return Easing.easeInQuad;
            case EasingEnum.easeOutQuad:
                return Easing.easeOutQuad;
            case EasingEnum.easeInOutQuad:
                return Easing.easeInOutQuad;
            case EasingEnum.easeInQuart:
                return Easing.easeInQuart;
            case EasingEnum.easeOutQuart:
                return Easing.easeOutQuart;
            case EasingEnum.easeInOutQuart:
                return Easing.easeInOutQuart;
            case EasingEnum.easeInQuint:
                return Easing.easeInQuint;
            case EasingEnum.easeOutQuint:
                return Easing.easeOutQuint;
            case EasingEnum.easeInOutQuint:
                return Easing.easeInOutQuint;
        }
        return Easing.linear;
    }

    static getCubicBezier(type: EasingEnum): string {
        switch (type) {
            case EasingEnum.linear:
                return '';
            case EasingEnum.easeInQuad:
                return 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
            case EasingEnum.easeOutQuad:
                return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            case EasingEnum.easeInOutQuad:
                return 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
            case EasingEnum.easeInCubic:
                return 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
            case EasingEnum.easeOutCubic:
                return 'cubic-bezier(0.215, 0.61, 0.355, 1)';
            case EasingEnum.easeInOutCubic:
                return 'cubic-bezier(0.645, 0.045, 0.355, 1)';
            case EasingEnum.easeInQuart:
                return 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
            case EasingEnum.easeOutQuart:
                return 'cubic-bezier(0.165, 0.84, 0.44, 1)';
            case EasingEnum.easeInOutQuart:
                return 'cubic-bezier(0.77, 0, 0.175, 1)';
            case EasingEnum.easeInQuint:
                return 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
            case EasingEnum.easeOutQuint:
                return 'cubic-bezier(0.23, 1, 0.32, 1)';
            case EasingEnum.easeInOutQuint:
                return 'cubic-bezier(0.86, 0, 0.07, 1)';
        }
        return '';
    }

    static reverse(fn: (t: number) => number): (t: number) => number {
        switch (fn.name) {
            case 'linear':
                return Easing.linear;
            case 'easeInCubic':
                return Easing.easeOutCubic;
            case 'easeOutCubic':
                return Easing.easeInCubic;
            case 'easeInQuad':
                return Easing.easeOutQuad;
            case 'easeOutQuad':
                return Easing.easeInQuad;
            case 'easeInOutQuad':
                return Easing.easeInOutQuad;
            case 'easeInOutCubic':
                return Easing.easeInOutCubic;
            case 'easeInQuart':
                return Easing.easeOutQuart;
            case 'easeOutQuart':
                return Easing.easeInQuart;
            case 'easeInOutQuart':
                return Easing.easeInOutQuart;
            case 'easeInQuint':
                return Easing.easeOutQuint;
            case 'easeOutQuint':
                return Easing.easeInQuint;
            case 'easeInOutQuint':
                return Easing.easeInOutQuint;
        }
        return Easing.linear;
    }
}
