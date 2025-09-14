import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faCheck,
  faClock,
  faHourglass,
  faLocationDot,
  faPaperPlane,
  faUser,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {ExamData, ExamStatus} from '@services/exam/exam.service';
import {ExamUiStateService} from '@services/exam/exam-ui-state.service';

@Component({
  selector: 'app-exam-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './exam-item.component.html',
})
export class ExamItemComponent {
  @Input() exam!: ExamData;

  private examUiStateService = inject(ExamUiStateService);

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
      case ExamStatus.Confirmed:
        return {
          text: 'Confirmé',
          class: 'text-sm text-green-500 rounded-full bg-green-100 px-4 py-2 font-bold',
          icon: this.faCheck
        };
      case ExamStatus.ToOrganize:
        return {
          text: 'À organiser',
          class: 'text-orange-500 rounded-full bg-orange-100 px-4 py-2 font-bold text-sm',
          icon: this.faPaperPlane
        };
      case ExamStatus.Canceled:
        return {
          text: 'Annulé',
          class: 'text-red-500 rounded-full bg-red-100 px-4 py-2 font-bold text-sm',
          icon: this.faXmark
        };
      case ExamStatus.WaitingPlace:
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

  onStatusBadgeClick() {
    this.examUiStateService.openStatusModal(this.exam);
  }
}
