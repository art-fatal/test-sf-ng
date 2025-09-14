import {Injectable, Inject, PLATFORM_ID, signal} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly apiUrl = `${environment.apiUrl}/login_check`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());

  private _loadingSignal = signal<boolean>(false);
  readonly loading = this._loadingSignal.asReadonly();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this._loadingSignal.set(true);
    return this.http.post<LoginResponse>(this.apiUrl, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }
        this._loadingSignal.set(false);
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        this._loadingSignal.set(false);
        throw error;
      })
    );
  }

  logout(): void {
    this._loadingSignal.set(true);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);
    this._loadingSignal.set(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Erreur lors de la validation du token:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  getAuthHeaders(): { [key: string]: string } {
    this._loadingSignal.set(true);
    const token = this.getToken();
    if (!token) {
      this._loadingSignal.set(false);
      return {};
    }

    this._loadingSignal.set(false);

    return {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  setLoading(value: boolean): void {
    this._loadingSignal.set(value);
  }
}
