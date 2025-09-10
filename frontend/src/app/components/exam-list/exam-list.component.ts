import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamItemComponent, ExamData } from '../exam-item/exam-item.component';
import { ExamHeaderComponent } from '../exam-header/exam-header.component';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, ExamItemComponent, ExamHeaderComponent],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent {
  @Input() exams: ExamData[] = [];
  @Output() organizeExam = new EventEmitter<void>();

  onOrganizeExam() {
    this.organizeExam.emit();
  }
}
