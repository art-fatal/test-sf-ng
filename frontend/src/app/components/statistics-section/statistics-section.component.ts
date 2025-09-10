import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsCardComponent} from '../statistics-card/statistics-card.component';
import {faHourglass, faListCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck, faClock} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-statistics-section',
  standalone: true,
  imports: [CommonModule, StatisticsCardComponent, FontAwesomeModule],
  templateUrl: './statistics-section.component.html',
  styleUrl: './statistics-section.component.css'
})
export class StatisticsSectionComponent {
  statistics = [
    {
      title: 'Confirmé',
      count: 28,
      icon: faCircleCheck,
      colorClass: 'text-green-600',
      iconColorClass: 'text-green-500'
    },
    {
      title: 'À organiser',
      count: 12,
      icon: faListCheck,
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
      icon: faClock,
      colorClass: 'text-blue-500',
      iconColorClass: 'text-blue-500'
    }
  ];
}
