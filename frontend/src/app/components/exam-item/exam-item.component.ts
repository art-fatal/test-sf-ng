import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faHourglass, faLocationDot, faClock, faCheck, faXmark, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';

export interface ExamData {
  studentName: string;
  location: string;
  date: string;
  time: string;
  status: 'confirmed' | 'to_organize' | 'cancelled' | 'searching';
  hasIcon?: boolean;
}

@Component({
  selector: 'app-exam-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './exam-item.component.html',
  styleUrl: './exam-item.component.css'
})
export class ExamItemComponent {
  @Input() exam!: ExamData;

  faCalendar = faCalendar;
  faHourglass = faHourglass;
  faLocationDot = faLocationDot;
  faClock = faClock;
  faCheck = faCheck;
  faXmark = faXmark;
  faPaperPlane = faPaperPlane;
  faUser = faUser;

  getStatusConfig() {
    switch (this.exam.status) {
      case 'confirmed':
        return {
          text: 'Confirmé',
          class: 'text-sm text-green-500 rounded-full bg-green-100 px-4 py-2 font-bold',
          icon: this.faCheck
        };
      case 'to_organize':
        return {
          text: 'À organiser',
          class: 'text-orange-500 rounded-full bg-orange-100 px-4 py-2 font-bold text-sm',
          icon: this.faPaperPlane
        };
      case 'cancelled':
        return {
          text: 'Annulé',
          class: 'text-red-500 rounded-full bg-red-100 px-4 py-2 font-bold text-sm',
          icon: this.faXmark
        };
      case 'searching':
        return {
          text: 'En recherche de place',
          class: 'text-gray-500 text-sm rounded-full bg-gray-100 px-4 py-2 font-bold',
          icon: this.faHourglass
        };
      default:
        return {
          text: 'Inconnu',
          class: 'text-gray-500 text-sm rounded-full bg-gray-100 px-4 py-2 font-bold',
          icon: this.faHourglass
        };
    }
  }
}
