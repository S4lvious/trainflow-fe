import { Component, HostListener } from '@angular/core';
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
    public isMobile: boolean = false;
    public dialogWidth: string = '60vw';
    public dialogHeight: string = '60vh';


  ngOnInit() {
    this.onResize();
    this.user = this._userService.getCurrentUser();
    this._workoutService.getTrainingCardsAsSelectItem(this.user.id).subscribe((cards) => {
      this.possibleTrainingCard = cards;
    });
    this._workoutService.getAllExercisesAsSelectItem().subscribe((exercises) => {
      this.exercises = exercises;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.isMobile = window.innerWidth <= 767;
      if (this.isMobile) {
          this.dialogWidth = '100vw';
          this.dialogHeight = '100vh';
      } else {
          this.dialogWidth = '60vw';
          this.dialogHeight = '60vh';
      }
  }


  onSelectExercise(event: any) {
    // Verifica se event.value non è uguale a 0 e se è definito
    if (event.value !== 0 && event.value) {
        // Calcola la differenza tra la lunghezza di extendedExercises e selectedExercises
        const difference = this.extendedExercises.length - this.selectedExercises.length;
        // Entra nella condizione solo se la differenza è minore o uguale a 1
        if (difference <= 1) {
            this.selectedExercises.push({ exerciseId: event.value, reps: 0, sets: 0 });
            this.extendedExercises = new Array(this.selectedExercises.length + 1).fill(null);
        }
    }
}

  valueOrDash(value: any) {
    return value ? value : '///';
  }

  getTrainingCardExercises(event: any) {
    this._workoutService.getTrainingCardExercises(this.selectedCard).subscribe((exercises) => {
      this.trainingCard = exercises;
    });
  }

  onChangeReps(event: any, index: number) {
    this.selectedExercises[index].reps = event.value;
  }

  onChangeSets(event: any, index: number) {
    this.selectedExercises[index].sets = event.value;
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