## StatisticsCardComponent

- Selector: `app-statistics-card`
- Standalone: true
- File: `src/app/components/statistics-card/statistics-card.component.ts`

### Inputs

- `title: string`
- `count: number`
- `icon: IconDefinition` — FontAwesome icon
- `colorClass: string`
- `iconColorClass: string`

### Outputs

- None

### Description

Displays a statistic with a value and an icon.

### Usage

```html
<app-statistics-card
  title="Confirmé"
  [count]="28"
  [icon]="faCircleCheck"
  colorClass="text-green-600"
  iconColorClass="text-green-500">
</app-statistics-card>
```

