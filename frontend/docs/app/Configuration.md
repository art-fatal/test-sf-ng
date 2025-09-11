## Application Configuration

- File: `src/app/app.config.ts`

Exports `appConfig: ApplicationConfig` with providers:

- `provideZoneChangeDetection({ eventCoalescing: true })`
- `provideRouter(routes)` — see `Routing.md`
- `provideClientHydration()`

### Usage

Used in `src/main.ts` with `bootstrapApplication(AppComponent, appConfig)`.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig);
```

