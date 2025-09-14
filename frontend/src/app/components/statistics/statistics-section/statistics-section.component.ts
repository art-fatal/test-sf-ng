import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ExamDomainStateService} from '@services/exam/exam-domain-state.service';
import {StatisticsCardComponent} from '@components/statistics/statistics-card/statistics-card.component';

@Component({
  selector: 'app-statistics-section',
  standalone: true,
  imports: [CommonModule, StatisticsCardComponent, FontAwesomeModule],
  templateUrl: './statistics-section.component.html',
})
export class StatisticsSectionComponent {
  protected examDomainStateService = inject(ExamDomainStateService);
}
