import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  private apiUrl = 'http://localhost:3000'; // Sostituisci con l'URL del tuo server di backend
  
  public login(username: string, password: string) {
    return this._http
      .post(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.userWithOutPassword)
            );
            localStorage.setItem('token', response.token);
          }
          return response;
        })
      );
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    if (token && currentUser) {
      let decodedToken = jwtDecode(token);
      const isExpired =
        decodedToken && decodedToken.exp
          ? decodedToken.exp < Date.now() / 1000
          : false;
      if (isExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }
}
