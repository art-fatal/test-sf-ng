import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatisticsSectionComponent } from './components/statistics-section/statistics-section.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { ExamData } from './components/exam-item/exam-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatisticsSectionComponent, ExamListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  exams: ExamData[] = [
    {
      studentName: 'Isabella.S',
      location: 'En attente',
      date: 'En attente',
      time: 'En attente',
      status: 'searching',
      hasIcon: true
    },
    {
      studentName: 'Franziska.S',
      location: 'Martigues-B',
      date: '16 juin',
      time: '14h',
      status: 'confirmed',
      hasIcon: false
    },
    {
      studentName: 'Lucas.R',
      location: 'Martigues-B',
      date: '21 juin',
      time: '17h',
      status: 'to_organize',
      hasIcon: false
    },
    {
      studentName: 'Léo.C',
      location: 'Martigues-B',
      date: '26 mai',
      time: '13h',
      status: 'cancelled',
      hasIcon: false
    }
  ];

  onOrganizeExam() {
    console.log('Organiser un examen');
    // Logique pour organiser un examen
  }
}
