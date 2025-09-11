## ExamHeaderComponent

- Selector: `app-exam-header`
- Standalone: true
- File: `src/app/components/exam-header/exam-header.component.ts`

### Inputs

- None

### Outputs

- `organizeExam: EventEmitter<void>` — emitted when the button is clicked.

### Description

Header for the exams list with a title and call-to-action button.

### Usage

```html
<app-exam-header (organizeExam)="onOrganizeExam()"></app-exam-header>
```

