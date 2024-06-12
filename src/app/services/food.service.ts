import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class FoodService {

    constructor(private http: HttpClient, private messageService: MessageService) { }

    apiUrl = 'https://trainflow-be.onrender.com/food'


    public searchFoodByAutoComplete(foodName: string, userId: number) {
        return this.http.get<any[]>(`${this.apiUrl}/searchFood/${foodName}/${userId}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
                }
            })
        )
    }

    public getFoodById(foodId: number, userId: number) {
        return this.http.get<any>(`${this.apiUrl}/getFoodById/${foodId}/${userId}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
                }
            })
        )
    }

    public addFoodToUser(food: Food, userId: number, date: string) {
        return this.http.post<any>(`${this.apiUrl}/addFoodToUser`, { food, userId, date }).pipe(
            tap({
                next: (response) => {
                    this.messageService.add({severity: 'success', summary:'Confermato!', detail: 'Cibo aggiunto con successo!' });
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
                }
            })
        )
    }

    public getFoodsByUser(userId: number, date: string) {
        return this.http.get<any[]>(`${this.apiUrl}/getFoodsByUser/${userId}/${date}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
                }
            })
        )
    }

    public deleteFoodFromUser(id: number) {
        return this.http.delete<any>(`${this.apiUrl}/deleteFoodFromUser/${id}`).pipe(
            tap({
                next: (response) => {
                    this.messageService.add({severity: 'success', summary:'Confermato!', detail: 'Cibo eliminato con successo!' });
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message });
                }
            })
        )
    }



}