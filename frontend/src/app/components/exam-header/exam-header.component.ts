import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-header.component.html',
  styleUrl: './exam-header.component.css'
})
export class ExamHeaderComponent {
  @Output() organizeExam = new EventEmitter<void>();

  onOrganizeExam() {
    this.organizeExam.emit();
  }
}
