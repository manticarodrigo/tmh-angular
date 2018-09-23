import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

interface AuthResponse {
  user: User,
  key: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth: AuthResponse;
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) {}
  
  isLoggedIn(): boolean {
    return Boolean(this.auth);
  }

  getAuthToken(): string {
    return this.auth ? `Token ${this.auth.key}` : null;
  }

  getAuth(): Observable<AuthResponse> {
    return new Observable(observer => {
      if (this.auth) {
        observer.next(this.auth);
        observer.complete();
      } else {
        this.storage.get('auth')
          .then((auth: AuthResponse) => {
            observer.next(auth ? this.setAuth(auth) : null);
            observer.complete();
          });
      }
    });
  }

  setAuth(auth: AuthResponse): AuthResponse {
    console.log('setting current auth:', auth);
    this.auth = auth;
    this.storage.set('auth', auth);
    return this.auth;
  }

  logout(): Promise<void> {
    return this.storage.clear()
      .then(() => this.auth = null);
  }

  register(
    username,
    first_name,
    last_name,
    email,
    password1,
    password2
  ): Observable<AuthResponse> {
    return this.http.post(
      `${environment.backendUrl}/rest-auth/registration/`,
      { username,
        first_name,
        last_name,
        email,
        password1,
        password2
      }
    ).pipe(map((res: AuthResponse) => this.setAuth(res)));
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.backendUrl}/rest-auth/login/`,
      { username, password }
    ).pipe(map((res: AuthResponse) => this.setAuth(res)));
  }

  facebookAuth(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.backendUrl}/rest-auth/facebook/`,
      { access_token: token }
    ).pipe(map((res: AuthResponse) => this.setAuth(res)));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(
      `${environment.backendUrl}/api/v1/users/${id}/`
    );
  }

  updateUser(user: User, file?: File): Observable<User> {
    const formData = new FormData();
    if (file) formData.append('image', file);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('city', user.city);
    formData.append('state', user.state);
    return this.http.patch<User>(
      `${environment.backendUrl}/api/v1/users/${user.id}/`,
      formData,
    );
  }
}
