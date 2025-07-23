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

const bootstrap = lifeCycles.bootstrap;
const mount = lifeCycles.mount;
const unmount = lifeCycles.unmount;

export { bootstrap, mount, unmount };
