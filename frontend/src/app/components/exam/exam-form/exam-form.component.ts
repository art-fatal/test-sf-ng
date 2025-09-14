import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ExamService, ExamApiData, ExamStatus} from '@services/exam/exam.service';
import { ExamDomainStateService } from '@services/exam/exam-domain-state.service';
import { ExamUiStateService } from '@services/exam/exam-ui-state.service';

export interface ExamFormData {
  studentName: string;
  location: string;
  date: string;
  time: string;
  status: string;
}

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent {
  private examDomainStateService = inject(ExamDomainStateService);
  private examUiStateService = inject(ExamUiStateService);

  protected readonly examService = inject(ExamService);
  protected readonly ExamStatus = ExamStatus;
  protected readonly Object = Object;

  readonly showExamForm = this.examUiStateService.showExamForm;

  formData: ExamFormData = {
    studentName: '',
    location: '',
    date: '',
    time: '',
    status: 'ToOrganize'
  };

  statusOptions = [
    { value: 'Confirmed', label: 'Confirmé' },
    { value: 'ToOrganize', label: 'À organiser' },
    { value: 'WaitingPlace', label: 'En attente de lieu' },
    { value: 'Canceled', label: 'Annulé' }
  ];

  isSubmitting = false;
  error: string | null = null;

  async onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const apiData: Partial<ExamApiData> = {
      studentName: this.formData.studentName,
      location: this.formData.location || null,
      date: this.formData.date,
      time: parseInt(this.formData.time),
      status: this.formData.status
    };

    try {
      await this.examDomainStateService.addExam(apiData);
      console.log('Examen créé avec succès');
      this.isSubmitting = false;
      this.examUiStateService.hideExamFormModal();
      this.resetForm();
    } catch (error) {
      console.error('Erreur lors de la création de l\'examen:', error);
      this.error = 'Erreur lors de la création de l\'examen. Veuillez réessayer.';
      this.isSubmitting = false;
    }
  }

  onCancel() {
    this.examUiStateService.hideExamFormModal();
    this.resetForm();
  }

  private validateForm(): boolean {
    if (!this.formData.studentName.trim()) {
      this.error = 'Le nom de l\'étudiant est requis';
      return false;
    }

    if (!this.formData.date) {
      this.error = 'La date est requise';
      return false;
    }

    if (!this.formData.time) {
      this.error = 'L\'heure est requise';
      return false;
    }

    const timeValue = parseInt(this.formData.time);
    if (isNaN(timeValue) || timeValue < 0 || timeValue > 23) {
      this.error = 'L\'heure doit être entre 0 et 23';
      return false;
    }

    this.error = null;
    return true;
  }

  private resetForm() {
    this.formData = {
      studentName: '',
      location: '',
      date: '',
      time: '',
      status: 'ToOrganize'
    };
    this.error = null;
  }

}
