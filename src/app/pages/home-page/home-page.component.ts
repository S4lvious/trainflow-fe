import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { Tab } from '../../models/tabs.model';
import { getFormattedDate } from '../../utility/date';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TFCardComponent } from '../../atoms/small-card/small-card.component';
import { WorkoutService } from '../../services/workout.service';
import { Exercise, ExerciseForm, ExerciseResponse } from '../../models/workout.model';
import { DataViewModule } from 'primeng/dataview';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [SidebarComponent, ButtonModule, CardModule, CommonModule, TFCardComponent, DataViewModule, SpeedDialModule, DialogModule, DropdownModule, FormsModule, InputNumberModule, FloatLabelModule, CalendarModule, ConfirmDialogModule],
    providers: [ConfirmationService, MessageService]
})
export class HomePageComponent implements OnInit {

    public user: User = {} as User;
    public sidebarVisible: boolean = true;
    public showDialog: boolean = false;
    public exercises: Exercise[] = [];
    public exercisesList: ExerciseResponse[] = [];
    public selectedExercise: number = 0;
    public selectedDate: string = getFormattedDate(0);
    public reps: number = 0;
    public sets: number = 0;
    public kg: number = 0;
    public possibleViews: Tab[] = [
        { label: 'Ieri', value: getFormattedDate(-1), clicked: false },
        { label: 'Oggi', value: getFormattedDate(0), clicked: false },
        { label: 'Domani', value: getFormattedDate(1), clicked: false }
    ];
    public isMobile: boolean = false;
    public dialogWidth: string = '40vw';
    public dialogHeight: string = '60vh';


    constructor(
        private userService: UserService,
        private workoutService: WorkoutService,
        private confirmationService: ConfirmationService
    ) { 
    }

    ngOnInit(): void {
       this.user = this.userService.getCurrentUser();
       this.onCardClick(this.possibleViews[1]);
         this.workoutService.getAllExercisesAsSelectItem().subscribe((exercises) => {
              this.exercisesList = exercises;
         });
         this.onResize()
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isMobile = window.innerWidth <= 767;
        if (this.isMobile) {
            this.dialogWidth = '100vw';
            this.dialogHeight = '100vh';
        } else {
            this.dialogWidth = '40vw';
            this.dialogHeight = '60vh';
        }
    }


    toggleVisibility() {
        this.sidebarVisible = true;
    }

    onCardClick(card: Tab) {
        this.possibleViews.forEach((tab) => {
            tab.clicked = false;
        });
        card.clicked = true;
        this.selectedDate = card.value;
        this.getExercisesByDate(this.selectedDate, this.user.id);

    }

    onSelectDate(date: Date) {
        const giorno = String(date.getDate()).padStart(2, '0');
        const mese = String(date.getMonth() + 1).padStart(2, '0'); 
        const anno = String(date.getFullYear());
        this.selectedDate = `${giorno}-${mese}-${anno}`;
        this.possibleViews.forEach((tab) => {
            if (tab.value === this.selectedDate) {
                tab.clicked = true;
            } else {
                tab.clicked = false;
            }
        });
        this.getExercisesByDate(this.selectedDate, this.user.id);
        }

    getExercisesByDate(date: string, userId: number) {
        this.workoutService.getWorkouts(date, userId).subscribe((exercises) => {
            this.exercises = exercises;
        });
    }

    addExercise() {
        const exercise: ExerciseForm = {
            id: this.selectedExercise,
            date: this.selectedDate,
            userId: this.user.id,
            reps: this.reps as number,
            sets: this.sets as number,
            kg: this.kg as number,
        }
        this.workoutService.addExercise(exercise).subscribe(() => {
            this.getExercisesByDate(this.selectedDate, this.user.id);
            this.showDialog = false;
        });
    }

    deleteExercise(exercise: Exercise) {
        this.confirmationService.confirm({
            message: 'Sicuro di voler eliminare questo esercizio?',
            header: 'Elimina esercizio',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:"Si",
            rejectLabel:"No",
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.workoutService.deleteExercise(exercise.id).subscribe(() => {
                    this.getExercisesByDate(this.selectedDate, this.user.id)
                });
    
            },
            reject: () => {
    
            }
        });
    }

    onFloatClick() {
        this.showDialog = true;
    }

}