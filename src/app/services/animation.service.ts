import { ScaleData } from './../models/scale-data.model';
import { TranslationData } from './../models/translation-data.model';
import { Easing, EasingEnum } from './../utils/easing';
import { ReversableAnim } from './../models/reversable-anim';
import { BoundingRect } from './../models/bouding-rect.model';
import {
    style, animate, AnimationBuilder, AnimationPlayer, stagger, query, group, keyframes,
    AnimationStyleMetadata,
    AnimationMetadata
} from '@angular/animations';
import { Injectable, ElementRef, AnimationKeyframesSequenceMetadata } from '@angular/core';

@Injectable()
export class AnimationService {
    public static readonly SELECTED_PROJECT_TITLE_POSITION_KEY = 'selectedProjectTitle';
    public static readonly SELECTED_PROJECT_IMAGE_POSITION_KEY = 'selectedProjectImage';
    public static readonly PREVIOUS_PAGE_KEY = 'previousPage';
    public static readonly MIN_DURATION = 150;
    public static readonly MAX_DURATION = 300;

    private _datas: Map<string, any>;

    constructor(private _builder: AnimationBuilder) {
        this._datas = new Map<string, any>();
    }

    public storeData(key: string, data: any) {
        this._datas.set(key, data);
    }

    public getData(key: string): any {
        return this._datas.get(key);
    }

    public removeData(key) {
        this._datas.delete(key);
    }

    /**
     * Compute data to translate an element at a current position from a initial position to a final position.
     * IE : translate a element at c from a to b
     * Example : scale a 1,1 rect from 2,2 to 3,3
     * @param initialPosition start position of the translation
     * @param finalPosition final position of the translation
     * @param currentPosition current position of the element that will be animated
     */
    public computeTranslateData(initialPosition: BoundingRect, finalPosition: BoundingRect, currentPosition: BoundingRect, duration?: number)
        : TranslationData {
        const initialDeltaX = initialPosition.x - currentPosition.x;
        const initialDeltaY = initialPosition.y - currentPosition.y;
        const finalDeltaX = finalPosition.x - currentPosition.x;
        const finalDeltaY = finalPosition.y - currentPosition.y;
        if (!duration) {
            duration = this.computeTranslationDuration(initialPosition, finalPosition);
        }

        return { initialDeltaX, initialDeltaY, finalDeltaX, finalDeltaY, duration };
    }

    /**
     * Compute data to scale an element at current size from initialSize to finalSize
     * Example : scale a 1x1 rect from 2x2 to 3x3
     * @param initialSize initial size of the scale
     * @param finalSize final size of the scale
     * @param currentSize current size of the element to scale
     */
    public computeScaleData(initialSize: BoundingRect, finalSize: BoundingRect, currentSize: BoundingRect, duration?: number): ScaleData {
        const initialScaleX = initialSize.width / currentSize.width;
        const initialScaleY = initialSize.height / currentSize.height;
        const finalScaleX = finalSize.width / currentSize.width;
        const finalScaleY = finalSize.height / currentSize.height;
        if (!duration) {
            duration = 200;
            // duration = this.computeDuration(initialPosition, finalPosition);
        }
        return { initialScaleX, initialScaleY, finalScaleX, finalScaleY, duration };
    }

    /**
     * Create animation metadata for an animation of a currentRect from a initialRect to a finalRect
     * @param initialPosition starting position of the translation
     * @param finalPosition final position of the translation
     * @param currentPosition current position of the element that will be animated
     * @param easingFunctionX easing function for x translation. Default is linear.
     * @param easingFunctionY easing function for y translation. Default is linear.
     * @param keyCount number of key frames to generate for non linear animation
     */
    public createTranslationAnimationMetadata(initialPosition: BoundingRect, finalPosition: BoundingRect, currentPosition: BoundingRect,
        easingFunctionX = EasingEnum.linear, easingFunctionY = EasingEnum.linear, keyCount = 10, duration?: number): AnimationMetadata[] {
        const translationData = this.computeTranslateData(initialPosition, finalPosition, currentPosition, duration);
        if (easingFunctionX === EasingEnum.linear && easingFunctionY === EasingEnum.linear) {
            return [
                style({ transform: `translate(${translationData.initialDeltaX}px, ${translationData.initialDeltaY}px)` }),
                animate(translationData.duration, style({ transform: `translate(${translationData.finalDeltaX}px, ${translationData.finalDeltaY}px)` }))
            ];
        }
        const keyFrames = this.generateTranslationKeyFrames(translationData, easingFunctionX, easingFunctionY, keyCount);
        return [
            animate(translationData.duration, keyframes(keyFrames))
        ];
    }

    /**
     * Create animation metadata for scaling an element with a current size from an initial size to a final size
     * @param initialSize initial size of the translation
     * @param finalSize final size of the translation
     * @param currentSize current size of the element to animate
     * @param easingFunctionX easing function to use for scaling on x absis. Default is linear.
     * @param easingFunctionY easing function to use for scaling on y absis. Default is linear.
     * @param keyCount number of key frames to generate for non linear scaling.
     */
    public createScaleAnimationMetadata(initialSize: BoundingRect, finalSize: BoundingRect, currentSize: BoundingRect,
        easingFunctionX = EasingEnum.linear, easingFunctionY = EasingEnum.linear, keyCount = 10, duration?: number): AnimationMetadata[] {
        const scaleData = this.computeScaleData(initialSize, finalSize, currentSize, duration);
        if (easingFunctionX === EasingEnum.linear && easingFunctionY === EasingEnum.linear) {
            return [
                style({ transform: `scale(${scaleData.initialScaleX}, ${scaleData.initialScaleY})` }),
                animate(scaleData.duration, style({ transform: `scale(${scaleData.finalScaleX}, ${scaleData.finalScaleY})` }))
            ];
        }
        const keyFrames = this.generateScaleKeyFrames(scaleData, easingFunctionX, easingFunctionY, keyCount);
        return [
            animate(scaleData.duration, keyframes(keyFrames))
        ];
    }

    /**
     * Create animation metadata for scale and translate an element at a current bound from an initial bound to a final bound
     * @param initialBound initial position and size
     * @param finalBound final position and size
     * @param currentBound current position and size
     * @param easingScaleFunctionX easing function for x scaling. Default is linear.
     * @param easingScaleFunctionY easing function for y scaling. Default is linear.
     * @param easingTranslateFunctionX easing function for x translation. Default is linear.
     * @param easingTranslateFunctionY easing function for y translation. Default is linear.
     * @param keyCount number of key frames to generate for non linear animation
     * @param duration duration of the animation. Override the auto compute of the duration.
     */
    public createScaleTranslateAnimationMetadata(initialBound: BoundingRect, finalBound: BoundingRect, currentBound: BoundingRect,
        easingScaleFunctionX = EasingEnum.linear, easingScaleFunctionY = EasingEnum.linear, easingTranslateFunctionX = EasingEnum.linear,
        easingTranslateFunctionY = EasingEnum.linear, keyCount = 10, duration?: number
    ): AnimationMetadata[] {
        const scaleData = this.computeScaleData(initialBound, finalBound, currentBound, duration);
        const translationData = this.computeTranslateData(initialBound, finalBound, currentBound, duration);
        const d = duration ? duration : Math.max(translationData.duration, scaleData.duration);
        if (easingScaleFunctionX === easingScaleFunctionY && easingScaleFunctionY === easingTranslateFunctionX
            && easingTranslateFunctionX === easingTranslateFunctionY) {
            const easing = easingScaleFunctionX === EasingEnum.linear ? '' : ' ' + Easing.getCubicBezier(easingScaleFunctionX);

            return [
                // tslint:disable-next-line:max-line-length
                style({ transform: `translate(${translationData.initialDeltaX}px, ${translationData.initialDeltaY}px) scale(${scaleData.initialScaleX}, ${scaleData.initialScaleY})`, 'transform-origin': 'top left' }),
                animate(`${d}ms${easing}`, style({ transform: `translate(${translationData.finalDeltaX}px, ${translationData.finalDeltaY}px) scale(${scaleData.finalScaleX}, ${scaleData.finalScaleY})` }))
            ];
        }
        const keyFrames = this.generateTranslateAndScaleKeyFrames(scaleData, translationData,
            easingScaleFunctionX, easingScaleFunctionY, easingTranslateFunctionX, easingTranslateFunctionY, keyCount);
        return [
            // tslint:disable-next-line:max-line-length
            style({ transform: `translate(${translationData.initialDeltaX}px, ${translationData.initialDeltaY}px) scale(${scaleData.initialScaleX}, ${scaleData.initialScaleY})`, 'transform-origin': 'top left' }),
            animate(d, keyframes(keyFrames))
        ];
    }

    /**
     * Generate keyframes of a translation animation to separate easing of x and y translation
     * @param deltaX value to translate on x absis
     * @param deltaY value to translate on y absis
     * @param easingFunctionX easing function to use for x absis translation
     * @param easingFunctionY easing function to use for y absis translation
     * @param fromZero do the translation has to start from 0,0 or from deltaX,deltaY
     */
    public generateTranslationKeyFrames(translationData: TranslationData, easingFunctionX: EasingEnum, easingFunctionY: EasingEnum, keyCount = 10)
        : AnimationStyleMetadata[] {
        const keys: AnimationStyleMetadata[] = [];
        const iterationCount = keyCount - 1;
        for (let i = 0; i <= iterationCount; i++) {
            const time = i / iterationCount;
            // tslint:disable-next-line:max-line-length
            const deltaX = translationData.initialDeltaX + ((translationData.finalDeltaX - translationData.initialDeltaX) * Easing.getFunction(easingFunctionX)(time));
            const deltaY = translationData.initialDeltaY + ((translationData.finalDeltaY - translationData.initialDeltaY) * Easing.getFunction(easingFunctionY)(time));

            keys.push(style({ transform: `translate(${deltaX}px, ${deltaY}px)`, offset: time }));
        }
        return keys;
    }

    /**
     * Generate keyframes for a none linear scale animation
     * @param scaleData data of the scale
     * @param easingFunctionX easing function for x scale
     * @param easingFunctionY easing function for y scale
     * @param keyCount number of keyframe to generate
     */
    public generateScaleKeyFrames(scaleData: ScaleData, easingFunctionX: EasingEnum, easingFunctionY: EasingEnum, keyCount = 10)
        : AnimationStyleMetadata[] {
        const keys: AnimationStyleMetadata[] = [];
        const iterationCount = keyCount - 1;
        for (let i = 0; i <= iterationCount; i++) {
            const time = i / iterationCount;
            const scaleX = scaleData.initialScaleX + ((scaleData.finalScaleX - scaleData.initialScaleX) * Easing.getFunction(easingFunctionX)(time));
            const scaleY = scaleData.initialScaleY + ((scaleData.finalScaleY - scaleData.initialScaleY) * Easing.getFunction(easingFunctionY)(time));
            keys.push(style({ transform: `scale(${scaleX}, ${scaleY})`, offset: time }));
        }
        return keys;
    }

    /**
     * Generate keyframes for a none linear scale translate animation
     * @param scaleData data of the scale
     * @param translationData data of the translation
     * @param easingScaleFunctionX easing function for x scale
     * @param easingScaleFunctionY easing function for y scale
     * @param easingTranslateFunctionX easing function for x translation
     * @param easingTranslateFunctionY easing function for y translation
     * @param keyCount number of keyframe to generate
     */
    public generateTranslateAndScaleKeyFrames(scaleData: ScaleData, translationData: TranslationData,
        easingScaleFunctionX = EasingEnum.linear, easingScaleFunctionY = EasingEnum.linear, easingTranslateFunctionX = EasingEnum.linear,
        easingTranslateFunctionY = EasingEnum.linear, keyCount = 10): AnimationStyleMetadata[] {

        const keys: AnimationStyleMetadata[] = [];
        const iterationCount = keyCount - 1;
        for (let i = 0; i <= iterationCount; i++) {
            const time = i / iterationCount;
            const scaleX = scaleData.initialScaleX + ((scaleData.finalScaleX - scaleData.initialScaleX) * Easing.getFunction(easingScaleFunctionX)(time));
            const scaleY = scaleData.initialScaleY + ((scaleData.finalScaleY - scaleData.initialScaleY) * Easing.getFunction(easingScaleFunctionY)(time));
            const deltaX = translationData.initialDeltaX + ((translationData.finalDeltaX - translationData.initialDeltaX) *
                Easing.getFunction(easingTranslateFunctionX)(time));
            const deltaY = translationData.initialDeltaY + ((translationData.finalDeltaY - translationData.initialDeltaY) *
                Easing.getFunction(easingTranslateFunctionY)(time));

            keys.push(style({ transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY}) `, offset: time }));
        }
        return keys;
    }

    /**
     * Compute the duration of a translation animation base on the distance to translate
     * @param initialPosition initial position
     * @param finalPosition final position
     */
    public computeTranslationDuration(initialPosition: BoundingRect, finalPosition: BoundingRect) {
        const a = finalPosition.x - initialPosition.x;
        const b = finalPosition.y - initialPosition.y;
        const distance = Math.sqrt(a * a + b * b);
        const screenWidth = Math.min(window.innerWidth, 1140);
        const coef = Math.min(1, distance / screenWidth);
        const duration = Math.max(AnimationService.MIN_DURATION, AnimationService.MAX_DURATION * coef);
        return duration;
    }

    /**
     * Compute the duration of a scale animation
     * @param initialSize initial size
     * @param finalSize final size
     */
    public computeScaleDuration(initialSize: BoundingRect, finalSize: BoundingRect) {
        const deltaWidth = Math.abs(finalSize.width - initialSize.width);
        const deltaHeight = Math.abs(finalSize.height - initialSize.height);
        const delta = Math.max(deltaWidth, deltaHeight);
        const screenWidth = Math.min(window.innerWidth, 1140);
        const coef = Math.min(1, delta / screenWidth);
        const duration = Math.max(AnimationService.MIN_DURATION, AnimationService.MAX_DURATION * coef);
        return duration;
    }

}
