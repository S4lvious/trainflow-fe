import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'tf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterModule]

})
export class SidebarComponent implements OnInit {

    public sidebarVisible: boolean = true;
    @Input() public name: string = '';
    @Input() public profilePic: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.location.reload();
    }


}