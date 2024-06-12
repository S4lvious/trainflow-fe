import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessageService, TreeNode } from 'primeng/api';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://trainflow-be.onrender.com/users' // inserisci il tuo URL dell'API qui

  constructor(private http: HttpClient, private messageService: MessageService) { }

  public tableUsers: TreeNode<User>[] = [];
  public isBack: boolean = false;

  public getChildrenUsers(userId?: any): Observable<TreeNode[]> {
    const currentUser = this.getCurrentUser()

    const params = new HttpParams()
    .set('id_utente', userId ? userId : currentUser?.id_utente)
    
    return this.http.get<any[]>(`${this.apiUrl}/userList`, {params}).pipe(
      tap({
        next: (response) => {
          return response;
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
        }
      }),
      map((users: any[]) => {
        return users.map(user => ({
          data: { ...user, key: user.id_utente }, // Copia tutti i dati dell'utente
          leaf: false
        }));
      })
    );
  }

  public getCurrentUser() {
    const user = localStorage.getItem('currentUser')!;
    return JSON.parse(user);
  }

  public getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      tap({
        next: (response) => {
          return response;
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
        }
      })
    );
  }

  public getUserParams(userId: number, dayOrNight: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getGameParametersById/${userId}/${dayOrNight}`).pipe(
      tap({
        next: (response) => {
          return response;
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
        }
      })
    );
  }

  public getGlobalGameParameters(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getGlobalGameParameters/${userId}`).pipe(
      tap({
        next: (response) => {
          return response;
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
        }
      })
    );
  }

  public isSuperAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.ruolo === 'S';
  }

  public getBonusByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getBonusByUserId/${userId}`).pipe(
      tap({
        next: (response) => {
          return response;
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
        }
      })
    );
  }

  public getUserGamesDisabled(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserDisabledGames/${userId}`).pipe(
      tap({
        next: (response) => {
          return response;
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
        }
      })
    );
  }

}
