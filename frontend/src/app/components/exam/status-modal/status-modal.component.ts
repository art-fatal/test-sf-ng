import {Component, inject, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExamData, ExamService, ExamStatus} from '@services/exam/exam.service';
import {ExamDomainStateService} from '@services/exam/exam-domain-state.service';
import {ExamUiStateService} from '@services/exam/exam-ui-state.service';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './status-modal.component.html'
})
export class StatusModalComponent {

  protected examDomainStateService = inject(ExamDomainStateService);
  protected examUiStateService = inject(ExamUiStateService);
  protected examService = inject(ExamService);

  readonly exam = this.examUiStateService.selectedExam;
  readonly ExamStatus = ExamStatus;
  readonly Object = Object;

  selectedStatus: ExamData['status'] = ExamStatus.Confirmed;
  isSaving = false;

  constructor() {
    effect(() => {
      const exam = this.exam();
      if (exam) {
        this.selectedStatus = exam.status;
      }
    });
  }

  getCurrentStatusLabel(): string {
    const exam = this.exam();
    if (!exam) return '';

    return this.examService.getStatusLabel(exam.status);
  }

  async onSave() {
    const exam = this.exam();
    if (!exam || this.isSaving) return;

    this.isSaving = true;

    try {
      this.examDomainStateService.updateExamStatus(exam, this.selectedStatus);

      this.examUiStateService.closeStatusModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    } finally {
      this.isSaving = false;
    }
  }

  onCancel() {
    this.examUiStateService.closeStatusModal();
  }
}
