import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule, IconDefinition} from '@fortawesome/angular-fontawesome';
import {StatisticsData} from '@services/exam/exam-domain-state.service';
import {faCircleCheck, faClock} from '@fortawesome/free-regular-svg-icons';
import {faListCheck, faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './statistics-card.component.html',
})
export class StatisticsCardComponent {
  @Input() stat!: StatisticsData;

  get title() {
    return this.stat.title;
  }
  get count() {
    return this.stat.count;
  }
  get icon() {
    return this.getIconForStat(this.stat);
  }
  get colorClass() {
    return this.stat.colorClass;
  }
  get iconColorClass() {
    return this.stat.iconColorClass;
  }

  private icons = {
    confirmed: faCircleCheck,
    to_organize: faListCheck,
    canceled: faXmark,
    searching: faClock
  };

  getIconForStat(stat: StatisticsData): IconDefinition {
    switch (stat.title) {
      case 'Confirmé':
        return this.icons.confirmed;
      case 'À organiser':
        return this.icons.to_organize;
      case 'Annulé':
        return this.icons.canceled;
      case 'En recherche de place':
        return this.icons.searching;
      default:
        return this.icons.confirmed;
    }
  }
}
