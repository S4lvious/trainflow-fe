import { Component, HostListener, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SpeedDialModule } from 'primeng/speeddial';
import { TFCardComponent } from '../../atoms/small-card/small-card.component';
import { UserService } from '../../services/user.service';
import { WorkoutService } from '../../services/workout.service';
import { User } from '../../models/user.model';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FoodService } from '../../services/food.service';
import { Exercise } from '../../models/workout.model';


@Component({
    selector: 'app-food-page',
    templateUrl: './food-page.component.html',
    styleUrls: ['./food-page.component.scss'],
    standalone: true,
    imports: [SidebarComponent, ButtonModule, CardModule, CommonModule, TFCardComponent, DataViewModule, SpeedDialModule, DialogModule, DropdownModule, FormsModule, InputNumberModule, FloatLabelModule, CalendarModule, ConfirmDialogModule, AutoCompleteModule],
    providers: [ConfirmationService, MessageService]

})
export class FoodPageComponent implements OnInit {

    constructor(
        private userService: UserService,
        private foodService: FoodService,
        private confirmationService: ConfirmationService

    ) { }

    public user: User = {} as User;
    public selectedDate: string = this.calculateDate(new Date());
    public foods: any[] = [];
    public showDialog: boolean = false;
    public selectedFood: number = 0;
    public dialogWidth: string = '40vw';
    public dialogHeight: string = '60vh';
    public filteredFoods: any[] = [];
    public grams: number = 100;
    public qty: number = 1;
    public selectedFoodCalories: number = 0;
    public selectedFoodProteins: number = 0;
    public selectedFoodCarbs: number = 0;
    public selectedFoodFats: number = 0;
    public servingTypes: any[] = [];
    public selectedServingType: string = '';
    public showServingType: boolean = false;
    public displayFoodCalories: number = 0;
    public displayFoodProteins: number = 0;
    public displayFoodCarbs: number = 0;
    public displayFoodFats: number = 0;
    public totalCalories: number = 0;
    public totalProteins: number = 0;
    public totalCarbs: number = 0;
    public totalFats: number = 0;
    public mediaQueryList: MediaQueryList = {} as MediaQueryList;
    public isMobile: boolean = false;



    ngOnInit(): void {  
        this.user = this.userService.getCurrentUser();
        this.onSelectDate(new Date());
        this.onResize();
    
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


    calculateCaloriesNotGrams() {
        this.displayFoodCalories = this.selectedFoodCalories * this.qty;
        this.displayFoodProteins = this.selectedFoodProteins * this.qty;
        this.displayFoodCarbs = this.selectedFoodCarbs * this.qty;
        this.displayFoodFats = this.selectedFoodFats * this.qty;
    }

    calculateCalories() {
        this.displayFoodCalories = this.selectedFoodCalories * this.grams / 100;
        this.displayFoodProteins = this.selectedFoodProteins * this.grams / 100;
        this.displayFoodCarbs = this.selectedFoodCarbs * this.grams / 100;
        this.displayFoodFats = this.selectedFoodFats * this.grams / 100;
        }

    onSelectDate(date: Date) {
        const giorno = String(date.getDate()).padStart(2, '0');
        const mese = String(date.getMonth() + 1).padStart(2, '0'); 
        const anno = String(date.getFullYear());
        this.selectedDate = `${giorno}-${mese}-${anno}`;
        this.foodService.getFoodsByUser(this.user.id, this.selectedDate).subscribe((data: any) => {
            this.foods = data;
            this.calculateTotalCalories();
        });

        }

        calculateTotalCalories() {
            this.totalCalories = 0;
            this.foods.forEach((food) => {
                this.totalCalories += food.food_calories;
                this.totalProteins += food.food_proteins;
                this.totalCarbs += food.food_carbs;
                this.totalFats += food.food_fats;
            });
            
        }

    calculateDate(date: Date): string {
        const giorno = String(date.getDate()).padStart(2, '0');
        const mese = String(date.getMonth() + 1).padStart(2, '0'); 
        const anno = String(date.getFullYear());
        return `${giorno}-${mese}-${anno}`;
    }

    onSelectFood(food: any) {
        this.selectedFood = food.value.food_id;
        this.servingTypes = [];
        this.foodService.getFoodById(this.selectedFood, this.user.id).subscribe((data: any) => {
            if (data.food.servings.serving) {
                data.food.servings.serving.forEach((serving: any, index: number) => {
                    this.servingTypes.push({name: serving.serving_description, value: serving.serving_description});
                })
                this.showServingType = true;

                }
            });
        }

        onSelectServingType() {
            this.foodService.getFoodById(this.selectedFood, this.user.id).subscribe((data: any) => {
                data.food.servings.serving.forEach((serving: any, index: number) => {
                    if (serving.serving_description === this.selectedServingType) {
                        this.selectedFoodCalories = parseInt(serving.calories);
                        this.selectedFoodProteins = parseInt(serving.protein);
                        this.selectedFoodCarbs = parseInt(serving.carbohydrate);
                        this.selectedFoodFats = parseInt(serving.fat);
                        this.calculateCalories();
                        this.calculateCaloriesNotGrams();
            
                    }
                })
            });
        }
    

    onUnselectFood() {
        this.selectedFood = 0;
        this.showServingType = false;
        this.selectedServingType = '';
        this.servingTypes = [];
        this.selectedFoodCalories = 0;
        this.selectedFoodProteins = 0;
        this.selectedFoodCarbs = 0;
        this.selectedFoodFats = 0;
        this.displayFoodCalories = 0;
        this.displayFoodProteins = 0;
        this.displayFoodCarbs = 0;
        this.displayFoodFats = 0;
    }

    deleteFood(food: any) {
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
                this.foodService.deleteFoodFromUser(food.id_current).subscribe(() => {
                    this.foodService.getFoodsByUser(this.user.id, this.selectedDate).subscribe((data: any) => {
                        this.foods = data;
                        this.calculateTotalCalories();
                    });
                });
    
            },
            reject: () => {
    
            }
        });
    }


    filterFoods(event: any) {
        this.foodService.searchFoodByAutoComplete(event.query, this.user.id).subscribe((data: any) => {
            this.filteredFoods = [...data.foods.food]
        });
    }

    onFloatClick() {
        this.showDialog = true;
    }

    getFoodName (food_id: number) {
        let foodName = '';
        this.filteredFoods.forEach((food) => {
            if (food.food_id == food_id) {
                foodName = food.food_name;
            }
        });
        return foodName;
    }

    getQtyName (grams: boolean): string {
        return grams ? ' g' : ' unità';
    }

    addFood() {
        const food = {
            foodId: this.selectedFood,
            name: this.getFoodName(this.selectedFood),
            grams: this.selectedServingType === '100 g' ? true : false,
            quantity: this.selectedServingType === '100 g' ? this.grams : this.qty,
            calories: this.displayFoodCalories,
            proteins: this.displayFoodProteins,
            carbs: this.displayFoodCarbs,
            fats: this.displayFoodFats
        }
        this.foodService.addFoodToUser(food, this.user.id, this.selectedDate).subscribe((data: any) => {
            this.showDialog = false;
            this.foodService.getFoodsByUser(this.user.id, this.selectedDate).subscribe((data: any) => {
                this.foods = data;
                this.calculateTotalCalories();
            });
        });
    }


}