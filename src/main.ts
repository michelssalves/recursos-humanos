import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/rh';
import { appConfig } from './app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
