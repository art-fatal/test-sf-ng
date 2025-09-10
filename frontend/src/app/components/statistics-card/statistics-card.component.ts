import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './statistics-card.component.html',
  styleUrl: './statistics-card.component.css'
})
export class StatisticsCardComponent {
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() icon!: IconDefinition;
  @Input() colorClass: string = '';
  @Input() iconColorClass: string = '';
}
