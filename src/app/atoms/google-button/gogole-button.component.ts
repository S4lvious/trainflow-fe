import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'tf-google-button',
    templateUrl: './google-button.component.html',
    styleUrls: ['./google-button.component.scss'],
    standalone: true
})
export class GoogleButtonComponent implements OnInit {

    @Input() click(): any {
    }

    constructor() { 

    }

    ngOnInit(): void {
    }

}