import { Injectable, signal, computed, inject } from '@angular/core';
import {ExamApiData, ExamData, ExamService, ExamStatus} from '@services/exam/exam.service';
import { firstValueFrom } from 'rxjs';

export interface StatisticsData {
  title: string;
  count: number;
  colorClass: string;
  iconColorClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamDomainStateService {
  private examService = inject(ExamService);

  private _examsSignal = signal<ExamData[]>([]);
  private _loadingSignal = signal<boolean>(false);
  private _errorSignal = signal<string | null>(null);

  readonly exams = this._examsSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();

  readonly upcomingExamsCount = computed(() => {
    return this.examService.getUpcomingExamsCount(this._examsSignal());
  });

  readonly statistics = computed(() => {
    const exams: ExamData[] = this._examsSignal();
    const stats: Record<ExamStatus, number> = {canceled: 0, confirmed: 0, to_organize: 0, waiting_place: 0};

    exams.forEach(exam => {
      stats[exam.status] = (stats[exam.status] || 0) + 1;
    });

    return stats;
  });

  readonly formattedStatistics = computed((): StatisticsData[] => {
    const stats = this.statistics();
    return [
      {
        title: 'Confirmé',
        count: stats[ExamStatus.Confirmed],
        colorClass: 'text-green-600',
        iconColorClass: 'text-green-500'
      },
      {
        title: 'À organiser',
        count: stats[ExamStatus.ToOrganize],
        colorClass: 'text-orange-500',
        iconColorClass: 'text-orange-500'
      },
      {
        title: 'Annulé',
        count: stats[ExamStatus.Canceled],
        colorClass: 'text-red-500',
        iconColorClass: 'text-red-500'
      },
      {
        title: 'En recherche de place',
        count: stats[ExamStatus.WaitingPlace],
        colorClass: 'text-blue-500',
        iconColorClass: 'text-blue-500'
      }
    ];
  });
  private startLoading() {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);
  }

  async loadExams(): Promise<void> {
    this.startLoading();
    try {
      const response = await firstValueFrom(this.examService.getExams());
      if (response) {
        const convertedExams = response.map(apiData =>
          this.examService.convertApiDataToExamData(apiData)
        );
        this._examsSignal.set(convertedExams);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des examens:', error);
      this._errorSignal.set('Impossible de charger les examens. Vérifiez que le serveur backend est démarré.');
    } finally {
      this._loadingSignal.set(false);
    }
  }

  async addExam(examData: Partial<ExamApiData>): Promise<void> {
    try {
      this.startLoading();
      const response = await firstValueFrom(this.examService.createExam(examData));
      if (response) {
        await this.loadExams();
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'examen:', error);
      throw error;
    }finally {
      this._loadingSignal.set(false);
    }
  }

  async updateExamStatus(exam: ExamData, newStatus: ExamData['status']): Promise<void> {
    try {
      this.startLoading();
      const response = await firstValueFrom(this.examService.updateExam({
        id: exam.id,
        status: newStatus
      }));
      if (response) {
        await this.loadExams();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'examen:', error);
      throw error;
    } finally {
      this._loadingSignal.set(false);
    }
  }
}
