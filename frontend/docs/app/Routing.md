## Routing

- File: `src/app/app.routes.ts`

Exports `routes: Routes = []`.

Add routes as needed. Example:

```ts
import { Routes } from '@angular/router';
import { SomeComponent } from './some/some.component';

export const routes: Routes = [
  { path: '', component: SomeComponent },
  { path: 'exams', loadComponent: () => import('./components/exam-list/exam-list.component').then(m => m.ExamListComponent) }
];
```

