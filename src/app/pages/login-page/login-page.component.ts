import { Component, OnInit } from '@angular/core';
import { GoogleButtonComponent } from '../../atoms/google-button/gogole-button.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    standalone: true,
    imports: [
        GoogleButtonComponent,
        GoogleSigninButtonModule,
        CommonModule,
        ProgressSpinnerModule
    ]

})
export class LoginPageComponent implements OnInit {

    constructor(
       private socialAuthService: SocialAuthService,
       private authService: AuthService,
       private router: Router
    ) { }

    public loading = false;

    ngOnInit(): void {
        this.socialAuthService.authState.subscribe((user) => {
            this.loading = true;
            this.authService.login(user).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response && response.token) {
                        this.router.navigate(['']);
                    }
                },
                error: () => {
                    this.loading = false;
                }
            });
        });

    }
}