import { enableProdMode, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const lifeCycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaProps.singleSpa.next(singleSpaProps);

    return bootstrapApplication(AppComponent, {
      providers: [getSingleSpaExtraProviders(), ...appConfig.providers],
    });
  },
  template: '<app-root></app-root>',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifeCycles.bootstrap;
export const mount = lifeCycles.mount;
export const unmount = lifeCycles.unmount;
