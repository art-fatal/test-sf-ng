import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamItemComponent } from '../exam-item/exam-item.component';
import { ExamHeaderComponent } from '../exam-header/exam-header.component';
import { ExamData } from '@services/exam/exam.service';
import { ExamDomainStateService } from '@services/exam/exam-domain-state.service';
import { ExamUiStateService } from '@services/exam/exam-ui-state.service';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, ExamItemComponent, ExamHeaderComponent],
  templateUrl: './exam-list.component.html',
})
export class ExamListComponent {
  protected examDomainStateService = inject(ExamDomainStateService);

  readonly exams = this.examDomainStateService.exams;
  readonly loading = this.examDomainStateService.loading;
  readonly error = this.examDomainStateService.error;
}
