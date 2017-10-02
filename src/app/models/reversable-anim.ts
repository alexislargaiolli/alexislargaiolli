import { AnimationPlayer } from '@angular/animations';

export class ReversableAnim {

    private onAnimDoneCallback: () => void;
    private onAnimReversedDoneCallback: () => void;
    animFinished = false;
    reversedAnimFinished = false;

    constructor(public anim: AnimationPlayer, public reversedAnim: AnimationPlayer) { }

    public play() {
        this.animFinished = false;
        this.anim.play();
        this.anim.onDone(() => {
            this.animFinished = true;
            if (this.onAnimDoneCallback) {
                this.onAnimDoneCallback();
            }
        });
    }

    public reverse() {
        this.reversedAnimFinished = false;
        this.reversedAnim.play();
        this.reversedAnim.onDone(() => {
            this.reversedAnimFinished = true;
            if (this.onAnimReversedDoneCallback) {
                this.onAnimReversedDoneCallback();
            }
        });
    }

    onAnimDone(fn: () => void): void {
        this.animFinished = true;
        this.onAnimDoneCallback = fn;
    }

    onReversedAnimDone(fn: () => void): void {
        this.onAnimReversedDoneCallback = fn;
    }

    destroy() {
        if (this.anim) {
            this.anim.destroy();
        }
        if (this.reversedAnim) {
            this.reversedAnim.destroy();
        }
    }
}
