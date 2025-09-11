## ExamListComponent

- Selector: `app-exam-list`
- Standalone: true
- File: `src/app/components/exam-list/exam-list.component.ts`

### Inputs

- `exams: ExamData[]` — list of exams to display.

### Outputs

- `organizeExam: EventEmitter<void>` — emitted when the "Organiser un examen" button is clicked in the header.

### Description

Displays a header and a list of `ExamItemComponent` entries.

### Usage

```html
<app-exam-list
  [exams]="exams"
  (organizeExam)="onOrganizeExam()">
</app-exam-list>
```

```ts
import { Component } from '@angular/core';
import { ExamListComponent } from '../../src/app/components/exam-list/exam-list.component';
import { ExamData } from '../../src/app/components/exam-item/exam-item.component';

@Component({
  selector: 'demo-exam-list',
  standalone: true,
  imports: [ExamListComponent],
  templateUrl: './demo-exam-list.html'
})
export class DemoExamListComponent {
  exams: ExamData[] = [
    { studentName: 'Alice', location: 'Martigues-B', date: '16 juin', time: '14h', status: 'confirmed' },
    { studentName: 'Bob', location: 'En attente', date: 'En attente', time: 'En attente', status: 'searching', hasIcon: true }
  ];

  onOrganizeExam() {
    alert('Organize exam');
  }
}
```

