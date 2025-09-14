import { Injectable, signal } from '@angular/core';
import { ExamData } from '@services/exam/exam.service';

@Injectable({
  providedIn: 'root'
})
export class ExamUiStateService {
  private _showExamFormSignal = signal<boolean>(false);
  private _showStatusModalSignal = signal<boolean>(false);
  private _selectedExamSignal = signal<ExamData | null>(null);

  readonly showExamForm = this._showExamFormSignal.asReadonly();
  readonly showStatusModal = this._showStatusModalSignal.asReadonly();
  readonly selectedExam = this._selectedExamSignal.asReadonly();

  showExamFormModal(): void {
    this._showExamFormSignal.set(true);
  }

  hideExamFormModal(): void {
    this._showExamFormSignal.set(false);
  }

  openStatusModal(exam: ExamData): void {
    this._selectedExamSignal.set(exam);
    this._showStatusModalSignal.set(true);
  }

  closeStatusModal(): void {
    this._showStatusModalSignal.set(false);
    this._selectedExamSignal.set(null);
  }
}
