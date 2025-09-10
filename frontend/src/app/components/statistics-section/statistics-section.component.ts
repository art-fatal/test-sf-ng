import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsCardComponent} from '../statistics-card/statistics-card.component';
import {faCheck, faHourglass, faPaperPlane, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-statistics-section',
  standalone: true,
  imports: [CommonModule, StatisticsCardComponent, FontAwesomeModule],
  templateUrl: './statistics-section.component.html',
  styleUrl: './statistics-section.component.css'
})
export class StatisticsSectionComponent {
  faHourglass = faHourglass;
  faCheck = faCheck;
  faXmark = faXmark;
  faPaperPlane = faPaperPlane;

  statistics = [
    {
      title: 'Confirmé',
      count: 28,
      icon: faCheck,
      colorClass: 'text-green-600',
      iconColorClass: 'text-green-500'
    },
    {
      title: 'À organiser',
      count: 12,
      icon: faPaperPlane,
      colorClass: 'text-orange-500',
      iconColorClass: 'text-orange-500'
    },
    {
      title: 'Annulé',
      count: 5,
      icon: faXmark,
      colorClass: 'text-red-500',
      iconColorClass: 'text-red-500'
    },
    {
      title: 'En recherche de place',
      count: 8,
      icon: faHourglass,
      colorClass: 'text-blue-500',
      iconColorClass: 'text-blue-500'
    }
  ];
}
