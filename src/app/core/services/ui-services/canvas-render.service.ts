import { Injectable, NgZone } from '@angular/core';
import { UISelectorsService } from './ui-selectors.service';
import { UIReducersService } from './ui-reducers.service';
import { RenderStepService } from './render-step.service';

const FRAME = 1000;

@Injectable({
  providedIn: 'root',
})
export class CanvasRenderService {
  private _manualRun = false;
  private _requestId = 0;
  private _lastTime = performance.now();

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _uiSelectors: UISelectorsService,
    private readonly _uiReducers: UIReducersService,
    private readonly _renderStep: RenderStepService
  ) {}

  /**
   * Starts the animation loop if not in manual run mode.
   */
  public start(): void {
    if (!this._manualRun) {
      this._ngZone.runOutsideAngular(() => {
        this._requestId = requestAnimationFrame((time) => this.animate(time));
      });
    }
  }

  /**
   * Stops the animation loop if running and not in manual mode.
   */
  public stop(): void {
    if (!this._manualRun && this._requestId) {
      cancelAnimationFrame(this._requestId);
    }
  }

  /**
   * Core animation loop.
   * @param time - The current time from requestAnimationFrame.
   * @param times - Optional number of frames to run (manual mode).
   * @param iteration - Current iteration/frame count (used in manual mode).
   */
  public animate(time: number, times?: number, iteration = 1): void {
    const running = this._uiSelectors.Running;
    const fps = this._uiSelectors.Fps;

    const frameDuration = FRAME / fps;

    if (times && !this._manualRun) {
      this._manualRun = true;
    }

    if ((!running && !this._manualRun) || (times && iteration > times)) {
      this._manualRun = false;
      this._uiReducers.Running = false;
      cancelAnimationFrame(this._requestId);
      return;
    }

    const delta = time - this._lastTime;
    if (delta >= frameDuration) {
      this._renderStep.Run();
      this._lastTime = time;
      iteration++;
    }

    if (this._requestId) {
      cancelAnimationFrame(this._requestId);
    }

    this._requestId = requestAnimationFrame(
      this.frameCallback(times, iteration)
    );
  }

  private frameCallback =
    (times?: number, iteration = 1) =>
    (newTime: number) =>
      this.animate(newTime, times, iteration);
}
