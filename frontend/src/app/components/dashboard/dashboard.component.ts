import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsSectionComponent } from '@components/statistics/statistics-section/statistics-section.component';
import { ExamListComponent } from '@components/exam/exam-list/exam-list.component';
import { ExamFormComponent } from '@components/exam/exam-form/exam-form.component';
import { StatusModalComponent } from '@components/exam/status-modal/status-modal.component';
import { ExamDomainStateService } from '@services/exam/exam-domain-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatisticsSectionComponent,
    ExamListComponent,
    ExamFormComponent,
    StatusModalComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  protected examDomainStateService = inject(ExamDomainStateService);

  async ngOnInit() {
    await this.examDomainStateService.loadExams();
  }
}
