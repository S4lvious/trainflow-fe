// src/app/components/progress-chart/progress-chart.component.ts

import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Chart } from 'chart.js';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ReportResponse } from '../../models/workout.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  standalone: true,
  imports: [SidebarComponent, ChartModule]
})
export class ReportPageComponent implements OnInit {

  constructor(
    private workoutService: WorkoutService,
    private userService: UserService
  ) {}

  public user: User = {} as User;
  public chartData: any;
  public chartOptions: any;


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.workoutService.getUserProgress(this.user.id).subscribe(data => {
      const datasets = [];
      const dates = [];

      // Estrai i dati e le etichette delle date dai risultati del backend
      for (const exercise in data) {
        const exerciseData = data[exercise];
        const exerciseLabel = exercise;
        const exerciseWeights = exerciseData.map(entry => entry.exercise_kg);
        const exerciseDates = exerciseData.map(entry => entry.date);
        
        dates.push(...exerciseDates); // Aggiungi le date all'array delle date
        datasets.push({
          label: exerciseLabel,
          data: exerciseWeights,
          borderColor: this.getRandomColor(),
          fill: false
        });
      }

      // Rimuovi eventuali date duplicate
      const uniqueDates = Array.from(new Set(dates));

      // Ordina le date in ordine cronologico
      uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      // Costruisci l'array delle etichette delle date nel formato richiesto da PrimeNG
      const labels = uniqueDates.map(date => this.formatDate(new Date(date)));

      this.chartData = {
        labels: labels,
        datasets: datasets
      };

      this.chartOptions = {
        responsive: true,
        title: {
          display: true,
          text: 'Exercise Weight Progress'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM DD, YYYY'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Weight (kg)'
            }
          }]
        }
      };
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${this.padZero(day)}/${this.padZero(month)}/${year}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }





}
