import { Component, OnInit } from '@angular/core';
import { GoogleButtonComponent } from '../../atoms/google-button/gogole-button.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    standalone: true,
    imports: [
        GoogleButtonComponent,
        GoogleSigninButtonModule
    ]

})
export class LoginPageComponent implements OnInit {

    constructor(
       private socialAuthService: SocialAuthService,
       private authService: AuthService,
       private router: Router
    ) { }

    ngOnInit(): void {
        this.socialAuthService.authState.subscribe((user) => {
            this.authService.login(user).subscribe((response) => {
                if (response && response.token) {
                    this.router.navigate(['']);
                }
            });
        });

    }
}