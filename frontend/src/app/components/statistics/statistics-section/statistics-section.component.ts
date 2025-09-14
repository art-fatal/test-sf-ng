import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ExamDomainStateService} from '@services/exam/exam-domain-state.service';
import {StatisticsCardComponent} from '@components/statistics/statistics-card/statistics-card.component';
import {AuthService} from '@services/auth/auth.service';
import {Router} from '@angular/router';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics-section',
  standalone: true,
  imports: [CommonModule, StatisticsCardComponent, FontAwesomeModule],
  templateUrl: './statistics-section.component.html',
})
export class StatisticsSectionComponent {
  protected examDomainStateService = inject(ExamDomainStateService);
  protected authService = inject(AuthService);
  private router = inject(Router);
  readonly faSignOutAlt = faSignOutAlt;
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
