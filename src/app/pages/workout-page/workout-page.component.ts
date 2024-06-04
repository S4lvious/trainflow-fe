import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ExerciseResponse, TrainingCardExercise, WorkoutProgramForm } from '../../models/workout.model';
import { WorkoutService } from '../../services/workout.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.scss'],
  standalone: true,
  imports: [SidebarComponent, DropdownModule, ButtonModule, DialogModule, InputTextModule, MultiSelectModule, FormsModule, CommonModule, InputNumberModule, DataViewModule]
})
export class WorkoutPageComponent {

  constructor(
    private _userService: UserService,
    private _workoutService: WorkoutService
  ) { 
    this.extendedExercises = new Array(this.selectedExercises.length + 1).fill(null);
  }

    public showDialog: boolean = false;
    public user: User = {} as User;
    public exercises: ExerciseResponse[] = [];
    public selectedExercises: WorkoutProgramForm[] = [];
    public extendedExercises: any[] = [];
    public selectedName: string = '';
    public possibleTrainingCard: any[] = [];
    public selectedCard: number = 0;
    public trainingCard: TrainingCardExercise[] = [];

  ngOnInit() {
    this.user = this._userService.getCurrentUser();
    this._workoutService.getTrainingCardsAsSelectItem(this.user.id).subscribe((cards) => {
      this.possibleTrainingCard = cards;
    });
    this._workoutService.getAllExercisesAsSelectItem().subscribe((exercises) => {
      this.exercises = exercises;
    });
  }



  onSelectExercise(event: any) {
    this.selectedExercises.push({ exerciseId: event.value, reps: 0, sets: 0 });
    this.extendedExercises = new Array(this.selectedExercises.length + 1).fill(null);
    console.log(this.selectedExercises);
    
  }

  valueOrDash(value: any) {
    return value ? value : '///';
  }

  getTrainingCardExercises(event: any) {
    this._workoutService.getTrainingCardExercises(this.selectedCard).subscribe((exercises) => {
      this.trainingCard = exercises;
      console.log(this.trainingCard);
    });
  }

  onChangeReps(event: any, index: number) {
    this.selectedExercises[index].reps = event.value;
    console.log(this.selectedExercises);
  }

  onChangeSets(event: any, index: number) {
    this.selectedExercises[index].sets = event.value;
    console.log(this.selectedExercises);
  }

  createTrainingCard() {
    this._workoutService.createWorkout({ userId: this.user.id, trainingCardName: this.selectedName, exercises: this.selectedExercises }).subscribe(() => {
      this.showDialog = false;
      this._workoutService.getTrainingCardsAsSelectItem(this.user.id).subscribe((cards) => {
        this.possibleTrainingCard = cards;
      });
    });
  }



}