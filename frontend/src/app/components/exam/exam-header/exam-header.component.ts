import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamDomainStateService } from '@services/exam/exam-domain-state.service';
import { ExamUiStateService } from '@services/exam/exam-ui-state.service';

@Component({
  selector: 'app-exam-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-header.component.html',
})
export class ExamHeaderComponent {
  protected examDomainStateService = inject(ExamDomainStateService);
  protected examUiStateService = inject(ExamUiStateService);
}
