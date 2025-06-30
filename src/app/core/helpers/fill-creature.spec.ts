import { CELL_SIZE } from '../../common/constants';
import { ICreature } from '../stores/creatures-store';
import { fillCreature } from './fill-creature';

const BLACK = '#000000';
const WHITE = '#ffffff';

describe('Fill creature helper', () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;

  const makeSureFillRectHaveBeenCalledWith = (
    fillRectSpy: jasmine.Spy<
      (x: number, y: number, w: number, h: number) => void
    >,
    creature: ICreature
  ) => {
    expect(fillRectSpy).toHaveBeenCalledWith(
      creature.x * CELL_SIZE,
      creature.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  };

  const makeSureStrokeRectHaveBeenCalledOnce = (
    fillRectSpy: jasmine.Spy<
      (x: number, y: number, w: number, h: number) => void
    >
  ) => {
    expect(fillRectSpy).toHaveBeenCalledTimes(1);
  };

  beforeEach(() => {
    canvas = document.createElement('canvas');

    canvas.width = 50;
    canvas.width = 50;

    context = canvas.getContext('2d');
  });

  it('should create a 2D rendering context', () => {
    expect(context).toBeTruthy();
  });

  it('should fill black if creature is alive', () => {
    if (!context) {
      fail('Context is null');
      return;
    }

    const creature: ICreature = {
      x: 1,
      y: 2,
      alive: true,
      dirty: false,
      id: `${1},${2}`,
    };

    const fillRectSpy = spyOn(context, 'fillRect').and.callThrough();
    const strokeRectSpy = spyOn(context, 'strokeRect').and.callThrough();

    fillCreature(creature, context);

    expect(context.fillStyle).toBe(BLACK);
    makeSureFillRectHaveBeenCalledWith(fillRectSpy, creature);
    makeSureStrokeRectHaveBeenCalledOnce(strokeRectSpy);
  });

  it('should fill white if creature is dead', () => {
    if (!context) {
      fail('Context is null');
      return;
    }

    const creature: ICreature = {
      x: 1,
      y: 2,
      alive: false,
      dirty: false,
      id: `${1},${2}`,
    };

    const fillRectSpy = spyOn(context, 'fillRect').and.callThrough();
    const strokeRectSpy = spyOn(context, 'strokeRect').and.callThrough();

    fillCreature(creature, context);

    expect(context.fillStyle).toBe(WHITE);
    makeSureFillRectHaveBeenCalledWith(fillRectSpy, creature);
    makeSureStrokeRectHaveBeenCalledOnce(strokeRectSpy);
  });
});
