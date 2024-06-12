import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private messageService: MessageService) {}
  private apiUrl = 'https://trainflow-be.onrender.com'; // Sostituisci con l'URL del tuo server di backend
  
  public login(user: any) {
    return this._http
      .post(`${this.apiUrl}/auth/login`, user)
      .pipe(
        tap({
          next: (response) => {
            return response;
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
          },
        }),
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
