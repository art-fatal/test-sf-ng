## Frontend Documentation

This directory documents all public components, types, configuration, and runtime APIs in the Angular frontend. Each page includes usage examples and guidance.

- Components
  - See `components/README.md` for an overview and individual component docs.
- App & Configuration
  - See `app/Configuration.md` and `app/Routing.md`.
- Runtime & SSR
  - See `runtime/Bootstrap.md` and `runtime/Server.md`.
- Styles
  - See `styles/Tailwind.md`.

### Quick Start

Use Angular standalone components directly in your components' `imports` array.

```ts
import { Component } from '@angular/core';
import { ExamListComponent } from '../src/app/components/exam-list/exam-list.component';
import { ExamData } from '../src/app/components/exam-item/exam-item.component';

@Component({
  selector: 'demo-host',
  standalone: true,
  imports: [ExamListComponent],
  template: `
    <app-exam-list [exams]="exams" (organizeExam)="onOrganizeExam()"></app-exam-list>
  `
})
export class DemoHostComponent {
  exams: ExamData[] = [
    { studentName: 'Jane D.', location: 'Center A', date: '18 Jun', time: '10:00', status: 'confirmed' },
    { studentName: 'John S.', location: 'En attente', date: 'En attente', time: 'En attente', status: 'searching', hasIcon: true }
  ];

  onOrganizeExam() {
    console.log('Organize exam clicked');
  }
}
```

For consolidated exports, you can import from `src/app/components/index.ts`.

```ts
import { ExamListComponent, ExamItemComponent, StatisticsSectionComponent } from '../src/app/components';
```

