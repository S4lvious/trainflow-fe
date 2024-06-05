import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTrainingCardBody, Exercise, ExerciseForm, ExerciseResponse, ReportResponse, TrainingCardExercise, WorkoutProgramBody } from '../models/workout.model';
import { map } from 'rxjs';

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

    public createWorkout(body: CreateTrainingCardBody) {
        return this.http.post(this.apiUrl + '/createTrainingCard', body);
    }
    
    public getTrainingCardsAsSelectItem(userId: number) {
        return this.http.get<any[]>(this.apiUrl + `/getTrainingCards/${userId}`).pipe(
            map((cards) => {
                return cards.map((card) => {
                    return {
                        name: card.training_card_name,
                        value: card.id
                    }
                })
            })
        )
    }

    public getTrainingCardExercises(trainingCardId: number) {
        return this.http.get<TrainingCardExercise[]>(this.apiUrl + `/getTrainingCardExercises/${trainingCardId}`);
    }

    public deleteExercise(exerciseId: number) {
        return this.http.delete(this.apiUrl + `/deleteExercise/${exerciseId}`);
    }


}