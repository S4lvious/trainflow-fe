import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MobileNavbarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'backoffice-support';
  public isLoginPage: boolean = false;

  constructor(
    private route: Router
    ) {}

  ngOnInit() {
    this.route.events.subscribe((event) => {
      if (this.route.url === '/login') {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    });
  }
}