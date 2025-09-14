import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export type ExamApiResponse = ExamApiData[];

export interface ExamApiData {
  id: number;
  studentName: string;
  location: string | null;
  time: number;
  status: string;
  date: string;
}

export enum ExamStatus {
  Confirmed = 'confirmed',
  ToOrganize = 'to_organize',
  Canceled = 'canceled',
  WaitingPlace = 'waiting_place'
}

export interface ExamData {
  id?: number;
  studentName: string;
  location: string;
  date: string;
  time: number;
  formattedTime: string;
  formattedDate: string;
  status: ExamStatus;
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = `${environment.apiUrl}/exams`;

  constructor(private http: HttpClient) { }

  getExams(): Observable<ExamApiResponse> {
    return this.http.get<ExamApiResponse>(this.apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  createExam(examData: Partial<ExamApiData>): Observable<ExamApiData> {
    return this.http.post<ExamApiData>(this.apiUrl, examData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  updateExam(examData: Partial<ExamApiData>): Observable<ExamApiData> {
    return this.http.patch<ExamApiData>(this.apiUrl + '/' + examData.id, examData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  convertApiDataToExamData(apiData: ExamApiData): ExamData {
    const statusMapping: { [key: string]: ExamStatus } = {
      'Confirmed': ExamStatus.Confirmed,
      'ToOrganize': ExamStatus.ToOrganize,
      'Canceled': ExamStatus.Canceled,
      'WaitingPlace': ExamStatus.WaitingPlace,
      'confirmed': ExamStatus.Confirmed,
      'to_organize': ExamStatus.ToOrganize,
      'cancelled': ExamStatus.Canceled,
      'canceled': ExamStatus.Canceled,
      'waiting_place': ExamStatus.WaitingPlace
    };

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date invalide';
      }
      const day = date.getDate();
      const month = date.toLocaleString('fr-FR', { month: 'long' });
      return `${day} ${month}`;
    };

    const formatTime = (timeNumber: number): string => {
      if (timeNumber < 0 || timeNumber > 23) {
        return 'Heure invalide';
      }
      return `${timeNumber.toString().padStart(2, '0')}h`;
    };

    return {
      ...apiData,
      location: apiData.location || 'En attente',
      formattedDate: formatDate(apiData.date),
      formattedTime: formatTime(apiData.time),
      status: statusMapping[apiData.status],
    };
  }
  getUpcomingExamsCount(exams: ExamData[]): number {
    const now = new Date();

    return exams.filter(exam => {
      if (exam.status !== ExamStatus.Confirmed) {
        return false;
      }

      if (!exam.date || exam.time === null || exam.time === undefined) {
        return false;
      }

      return this.isExamInFuture(exam, now);
    }).length;
  }

  isExamInFuture(exam: ExamData, now: Date): boolean {
    try {
      const examDateTime = this.getExamDateTime(exam);
      return examDateTime > now;
    } catch (error) {
      console.warn('Erreur lors de la vérification de la date:', error);
      return false;
    }
  }

  getExamDateTime(exam: ExamData): Date {
    const date = new Date(exam.date);

    if (isNaN(date.getTime())) {
      throw new Error('Date invalide');
    }

    const examDateTime = new Date(date);
    examDateTime.setHours(exam.time, 0, 0, 0);

    return examDateTime;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case ExamStatus.Confirmed:
        return 'Confirmé';
      case ExamStatus.ToOrganize:
        return 'À organiser';
      case ExamStatus.Canceled:
        return 'Annulé';
      case ExamStatus.WaitingPlace:
        return 'En recherche de place';
      default:
        return 'Inconnu';
    }
  }
}
