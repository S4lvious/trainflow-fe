import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
    providedIn: 'root'
})
export class FoodService {

    constructor(private http: HttpClient) { }

    apiUrl = 'https://trainflow-be.onrender.com/food'


    public searchFoodByAutoComplete(foodName: string, userId: number) {
        return this.http.get<any[]>(`${this.apiUrl}/searchFood/${foodName}/${userId}`)
    }

    public getFoodById(foodId: number, userId: number) {
        return this.http.get<any>(`${this.apiUrl}/getFoodById/${foodId}/${userId}`)
    }

    public addFoodToUser(food: Food, userId: number, date: string) {
        return this.http.post<any>(`${this.apiUrl}/addFoodToUser`, { food, userId, date })
    }

    public getFoodsByUser(userId: number, date: string) {
        return this.http.get<any[]>(`${this.apiUrl}/getFoodsByUser/${userId}/${date}`)
    }

    public deleteFoodFromUser(id: number) {
        return this.http.delete<any>(`${this.apiUrl}/deleteFoodFromUser/${id}`)
    }



}