import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise, ExerciseForm, ExerciseResponse, ReportResponse } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl: string = 'http://localhost:3000/workout';

    constructor(private http: HttpClient) { }

    public getWorkouts(date: string, userId: number) {
        return this.http.get<Exercise[]>(this.apiUrl + `/getExerciseByDateAndUserId/${userId}/${date}`);
    }

    public getAllExercisesAsSelectItem() {
        return this.http.get<ExerciseResponse[]>(this.apiUrl + '/getAllExercises');
    }    

    public addExercise(exercise: ExerciseForm) {
        return this.http.post(this.apiUrl + '/addExercise', exercise);
    }

    public getUserProgress(userId: number) {
        return this.http.get<ReportResponse>(this.apiUrl + `/viewReport/${userId}`);
    }


}