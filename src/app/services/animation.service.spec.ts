import { TranslationData } from './../models/translation-data.model';
import { Easing, EasingEnum } from './../utils/easing';
import { ScaleData } from './../models/scale-data.model';
import { AnimationBuilder, style } from '@angular/animations';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimationService } from './animation.service';

fdescribe('AnimationService: ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationService, AnimationBuilder]
    });
  });

  it('should ...', inject([AnimationService], (service: AnimationService) => {
    expect(service).toBeTruthy();
  }));

  describe('Translation: ', () => {
    const rect1 = { x: 1, y: 1, width: 0, height: 0 };
    const rect2 = { x: 2, y: 2, width: 0, height: 0 };
    const rect3 = { x: 3, y: 3, width: 0, height: 0 };
    const translationData: TranslationData = { initialDeltaX: 1, initialDeltaY: 1, finalDeltaX: 2, finalDeltaY: 2, duration: 100 };
    const translationData2: TranslationData = { initialDeltaX: -1, initialDeltaY: -1, finalDeltaX: 1, finalDeltaY: 1, duration: 100 };

    describe('computeTranslation()', () => {

      it('should return (1,1) to (2,2) to translate a rectangle at 1,1 from 2,2 to 3,3',
        inject([AnimationService], (service: AnimationService) => {
          const data = service.computeTranslateData(rect2, rect3, rect1);
          expect(data).toEqual(translationData);
        }));

      it('should return (-1,-1) to (1,1) to translate a rectangle at 2,2 from 1,1 to 3,3',
        inject([AnimationService], (service: AnimationService) => {
          const data = service.computeTranslateData(rect1, rect3, rect2);
          expect(data).toEqual(translationData2);
        }));

      it('should return (-1,-1) to (1,1) to translate a rectangle at 1,2 from 2,1 to 1,2',
        inject([AnimationService], (service: AnimationService) => {
          const r1 = { x: 1, y: 2, width: 0, height: 0 };
          const r2 = { x: 2, y: 1, width: 0, height: 0 };
          const data = service.computeTranslateData(r2, r1, r1);
          const result: TranslationData = { initialDeltaX: 1, initialDeltaY: -1, finalDeltaX: 0, finalDeltaY: 0, duration: 100 };
          expect(data).toEqual(result);
        }));

    });

    describe('generateTranslateKeyFrames for a none linear translate animation ', () => {

      it('should return a array of tranform:tranlate key', inject([AnimationService], (service: AnimationService) => {
        const keys = service.generateTranslationKeyFrames(translationData, EasingEnum.easeInCubic, EasingEnum.easeInOutCubic, 3);
        expect(keys.length).toBe(3);
        expect(keys[0].styles['transform']).toBe('translate(1px, 1px)');
        expect(keys[1].styles['transform']).toBe('translate(1.125px, 1.5px)');
        expect(keys[2].styles['transform']).toBe('translate(2px, 2px)');
      }));

      it('should support negative translation', inject([AnimationService], (service: AnimationService) => {
        const keys = service.generateTranslationKeyFrames(translationData2, EasingEnum.easeInCubic, EasingEnum.easeInOutCubic, 3);
        expect(keys.length).toBe(3);
        expect(keys[0].styles['transform']).toBe('translate(-1px, -1px)');
        expect(keys[1].styles['transform']).toBe('translate(-0.75px, 0px)');
        expect(keys[2].styles['transform']).toBe('translate(1px, 1px)');
      }));

    });

    describe('createTranslationAnimationMetadata create AnimationMetadata[] for a none linear translate animation ', () => {

      it('should return a array of AnimationMetadata with key frames for non linear animation', inject([AnimationService], (service: AnimationService) => {
        const keyCount = 10;
        const animMetadata = service.createTranslationAnimationMetadata(rect1, rect2, rect3, EasingEnum.easeInCubic, EasingEnum.easeInCubic, keyCount);
        expect(animMetadata.length).toBe(1);
        expect(animMetadata[0]['styles']['steps'].length).toBe(keyCount);
      }));

      it('should return a array of AnimationMetadata without key frames for linear animation', inject([AnimationService], (service: AnimationService) => {
        const animMetadata = service.createTranslationAnimationMetadata(rect1, rect2, rect3);
        expect(animMetadata.length).toBe(2);
        expect(animMetadata[0]['styles']['transform']).toBe('translate(-2px, -2px)');
      }));

    });

    describe('computeTranslationDuration() ', () => {

      it('should return a value close to MIN_DURATION for small translation', inject([AnimationService], (service: AnimationService) => {
        const r1 = { x: 0, y: 0, width: 0, height: 0 };
        const r2 = { x: 400, y: 0, width: 0, height: 0 };
        const duration = service.computeTranslationDuration(r1, r2);
        expect(duration).toBeGreaterThan(AnimationService.MIN_DURATION);
        expect(duration).toBeLessThan(AnimationService.MAX_DURATION);
        expect(duration - 50).toBeLessThan(AnimationService.MIN_DURATION);
      }));

      it('should return a value close to MAX_DURATION for big translation', inject([AnimationService], (service: AnimationService) => {
        const r1 = { x: 0, y: 0, width: 0, height: 0 };
        const r2 = { x: 800, y: 0, width: 0, height: 0 };
        const duration = service.computeTranslationDuration(r1, r2);
        expect(duration).toBeGreaterThan(AnimationService.MIN_DURATION);
        expect(duration).toBeLessThan(AnimationService.MAX_DURATION);
        expect(duration + 50).toBeGreaterThan(AnimationService.MAX_DURATION);
      }));

    });


  });

  describe('Scale: ', () => {
    const rect1 = { x: 0, y: 0, width: 2, height: 2 };
    const rect2 = { x: 0, y: 0, width: 1, height: 1 };
    const rect3 = { x: 0, y: 0, width: 3, height: 3 };
    const scaleData: ScaleData = { initialScaleX: 0.5, initialScaleY: 0.5, finalScaleX: 1.5, finalScaleY: 1.5, duration: 200 };
    const scaleData2: ScaleData = { initialScaleX: 2, initialScaleY: 2, finalScaleX: 3, finalScaleY: 3, duration: 200 };


    describe('computeScaleData()', () => {

      it('should return (0.5,0.5) to (1.5,1.5) for scaling a rectangle of 2x2 from 1x1 to 3x3', inject([AnimationService], (service: AnimationService) => {
        const data = service.computeScaleData(rect2, rect3, rect1);
        expect(data).toEqual(scaleData);
      }));

      it('should return (2,2) to (3,3) for scaling a rectangle of 2x2 from 3x2 to 1x1', inject([AnimationService], (service: AnimationService) => {
        const data = service.computeScaleData(rect1, rect3, rect2);
        expect(data).toEqual(scaleData2);
      }));

    });


    describe('generateScaleKeyFrames for a none linear scaling animation ', () => {

      it('should return a array of transform:scale key', inject([AnimationService], (service: AnimationService) => {
        const keys = service.generateScaleKeyFrames(scaleData, EasingEnum.easeInCubic, EasingEnum.easeInOutCubic, 3);
        expect(keys.length).toBe(3);
        expect(keys[0].styles['transform']).toBe('scale(0.5, 0.5)');
        expect(keys[1].styles['transform']).toBe('scale(0.625, 1)');
        expect(keys[2].styles['transform']).toBe('scale(1.5, 1.5)');
      }));

    });

    describe('createScaleAnimationMetadata() create AnimationMetadata[] for a scaling animation ', () => {

      it('should return a array of AnimationMetadata with key frames for non linear animation', inject([AnimationService], (service: AnimationService) => {
        const keyCount = 10;
        const animMetadata = service.createScaleAnimationMetadata(rect1, rect2, rect3, EasingEnum.easeInCubic, EasingEnum.easeInCubic, keyCount);
        expect(animMetadata.length).toBe(1);
        expect(animMetadata[0]['styles']['steps'].length).toBe(keyCount);
      }));

      it('should return a array of AnimationMetadata without key frames for linear animation', inject([AnimationService], (service: AnimationService) => {
        const animMetadata = service.createScaleAnimationMetadata(rect1, rect2, { x: 0, y: 0, width: 4, height: 4 });
        expect(animMetadata.length).toBe(2);
        expect(animMetadata[0]['styles']['transform']).toBe('scale(0.5, 0.5)');
      }));

    });

    describe('computeScaleDuration() ', () => {

      it('should return a value close to MIN_DURATION for small scaling', inject([AnimationService], (service: AnimationService) => {
        const r1 = { x: 0, y: 0, width: 200, height: 200 };
        const r2 = { x: 0, y: 0, width: 600, height: 400 };
        const duration = service.computeScaleDuration(r1, r2);
        expect(duration).toBeGreaterThan(AnimationService.MIN_DURATION);
        expect(duration).toBeLessThan(AnimationService.MAX_DURATION);
        expect(duration - 50).toBeLessThan(AnimationService.MIN_DURATION);
      }));

      it('should return a value close to MAX_DURATION for big scaling', inject([AnimationService], (service: AnimationService) => {
        const r1 = { x: 0, y: 0, width: 200, height: 200 };
        const r2 = { x: 0, y: 0, width: 1100, height: 400 };
        const duration = service.computeScaleDuration(r1, r2);
        expect(duration).toBeGreaterThan(AnimationService.MIN_DURATION);
        expect(duration).toBeLessThan(AnimationService.MAX_DURATION);
        expect(duration + 50).toBeGreaterThan(AnimationService.MAX_DURATION);
      }));

    });

  });
});

describe('Scale translate: ', () => {
  const rect1 = { x: 0, y: 0, width: 1, height: 1 };
  const rect2 = { x: 3, y: 3, width: 4, height: 4 };
  const rect3 = { x: 1, y: 1, width: 2, height: 2 };
  const scaleData: ScaleData = { initialScaleX: 0.5, initialScaleY: 0.5, finalScaleX: 2, finalScaleY: 2, duration: 200 };
  const translationData: TranslationData = { initialDeltaX: -1, initialDeltaY: -1, finalDeltaX: 2, finalDeltaY: 2, duration: 100 };

  describe('generateTranslateAndScaleKeyFrames()', () => {

    it('should return a array of keyframes containing transform:(scale(...) translate(...))', inject([AnimationService], (service: AnimationService) => {
      const keys = service.generateTranslateAndScaleKeyFrames(scaleData, translationData,
        EasingEnum.linear, EasingEnum.linear, EasingEnum.linear, EasingEnum.linear, 3);
      expect(keys.length).toBe(3);
      expect(keys[0].styles['transform']).toBe('scale(0.5, 0.5) translate(-1px, -1px)');
      expect(keys[1].styles['transform']).toBe('scale(1.25, 1.25) translate(0.5px, 0.5px)');
      expect(keys[2].styles['transform']).toBe('scale(2, 2) translate(2px, 2px)');
    }));

  });

  describe('createScaleTranslateAnimationMetadata()', () => {

    it('should return a array of AnimationMetadata with key frames for non linear animation', inject([AnimationService], (service: AnimationService) => {
      const keyCount = 10;
      const animMetadata = service.createScaleTranslateAnimationMetadata(rect1, rect2, rect3,
        EasingEnum.easeInCubic, EasingEnum.easeInCubic, EasingEnum.easeInCubic, EasingEnum.easeInCubic, keyCount);
      expect(animMetadata.length).toBe(1);
      expect(animMetadata[0]['styles']['steps'].length).toBe(keyCount);
    }));

    it('should return a array of AnimationMetadata without key frames for linear animation', inject([AnimationService], (service: AnimationService) => {
      const animMetadata = service.createScaleTranslateAnimationMetadata(rect1, rect2, rect3);
      expect(animMetadata.length).toBe(2);
      expect(animMetadata[0]['styles']['transform']).toBe('scale(0.5, 0.5) translate(-1px, -1px)');
    }));

  });

});
