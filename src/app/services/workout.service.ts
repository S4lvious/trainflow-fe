import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTrainingCardBody, Exercise, ExerciseForm, ExerciseResponse, ReportResponse, TrainingCardExercise, WorkoutProgramBody } from '../models/workout.model';
import { map, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl: string = 'https://trainflow-be.onrender.com/workout';

    constructor(private http: HttpClient, private messageService: MessageService) { }

    public getWorkouts(date: string, userId: number) {
        return this.http.get<Exercise[]>(this.apiUrl + `/getExerciseByDateAndUserId/${userId}/${date}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }

    public getAllExercisesAsSelectItem() {
        return this.http.get<ExerciseResponse[]>(this.apiUrl + '/getAllExercises').pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            }),
        )
    }    

    public addExercise(exercise: ExerciseForm) {
        return this.http.post(this.apiUrl + '/addExercise', exercise).pipe(
            tap({
                next: (response) => {
                    this.messageService.add({severity: 'success', summary:'Confermato!', detail: 'Esercizio aggiunto con successo!' });
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }

    public getUserProgress(userId: number) {
        return this.http.get<ReportResponse>(this.apiUrl + `/viewReport/${userId}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }

    public createWorkout(body: CreateTrainingCardBody) {
        return this.http.post(this.apiUrl + '/createTrainingCard', body).pipe(
            tap({
                next: (response) => {
                    this.messageService.add({severity: 'success', summary:'Confermato!', detail: 'Scheda di allenamento creata con successo!' });
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }
    
    public getTrainingCardsAsSelectItem(userId: number) {
        return this.http.get<any[]>(this.apiUrl + `/getTrainingCards/${userId}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            }),
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
        return this.http.get<TrainingCardExercise[]>(this.apiUrl + `/getTrainingCardExercises/${trainingCardId}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }

    public deleteExercise(exerciseId: number) {
        return this.http.delete(this.apiUrl + `/deleteExercise/${exerciseId}`).pipe(
            tap({
                next: (response) => {
                    this.messageService.add({severity: 'success', summary:'Confermato!', detail: 'Esercizio eliminato con successo!' });
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }

    public getAllTrainCardsExercise (userId: number) {
        return this.http.get<any[]>(this.apiUrl + `/getAllExercisesByTrainingCard/:userId/${userId}`).pipe(
            tap({
                next: (response) => {
                    return response;
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary:'Error', detail: error.error.message ?? error.message });
                }
            })
        )
    }


}