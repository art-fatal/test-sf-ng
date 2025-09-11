## ExamItemComponent

- Selector: `app-exam-item`
- Standalone: true
- File: `src/app/components/exam-item/exam-item.component.ts`

### Inputs

- `exam: ExamData` (required)
  - `ExamData` fields:
    - `studentName: string`
    - `location: string`
    - `date: string`
    - `time: string`
    - `status: 'confirmed' | 'to_organize' | 'cancelled' | 'searching'`
    - `hasIcon?: boolean`

### Outputs

- None

### Description

Renders a single exam row with icons and a status badge. Uses FontAwesome icons.

### Usage

```html
<app-exam-item [exam]="exam"></app-exam-item>
```

```ts
import { Component } from '@angular/core';
import { ExamItemComponent, ExamData } from '../../src/app/components/exam-item/exam-item.component';

@Component({
  selector: 'demo-exam-item',
  standalone: true,
  imports: [ExamItemComponent],
  template: `<app-exam-item [exam]="exam"></app-exam-item>`
})
export class DemoExamItemComponent {
  exam: ExamData = {
    studentName: 'Jane Doe',
    location: 'Center A',
    date: '18 Jun',
    time: '10:00',
    status: 'confirmed'
  };
}
```

