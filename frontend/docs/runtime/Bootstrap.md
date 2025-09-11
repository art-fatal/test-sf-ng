## Browser Bootstrap

- File: `src/main.ts`

Bootstraps the Angular application in the browser using `bootstrapApplication` and `appConfig`.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
```

## Server Bootstrap (SSR)

- File: `src/main.server.ts`

Exports a default function that bootstraps the app with merged server config.

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);
export default bootstrap;
```

